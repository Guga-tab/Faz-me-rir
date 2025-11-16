import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinanceContext = createContext();
const STORAGE_KEY = '@FazMeRirApp:data';

// Lista de todos os desafios disponíveis no app
const initialChallenges = [
  { 
    id: 'first_expense', 
    title: 'First Step', 
    description: 'Register your first expense.', 
    points: 10, 
    completed: false 
  },
  { 
    id: 'five_expenses', 
    title: 'Getting Started', 
    description: 'Register 5 expenses in total.', 
    points: 50, 
    completed: false 
  },
  { 
    id: 'under_limit_day', 
    title: 'Daily Master', 
    description: 'End a day below the daily limit.', 
    points: 100, 
    completed: false 
  },
  // Você pode adicionar mais desafios como 'Spend less than $10', etc.
];

// Função para calcular o nível a partir dos pontos (XP)
const calculateLevel = (points) => {
    // Fórmula simples: Nível = Piso(sqrt(pontos / 100))
    // Ex: 100pts = Nível 1, 400pts = Nível 2, 900pts = Nível 3
    return Math.floor(Math.sqrt(points / 100)) + 1;
};

export const FinanceProvider = ({ children }) => {
  // Dados Financeiros
  const [transactions, setTransactions] = useState([]);
  const [dailyLimit, setDailyLimit] = useState(100);
  
  // Dados de Gamificação
  const [points, setPoints] = useState(0);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [goalSuccessDays, setGoalSuccessDays] = useState([]);
  
  // Calcula o nível e o progresso XP atual
  const currentLevel = calculateLevel(points);

  // Função para verificar dias passados e conceder o prêmio
  const checkPastDaysForGoal = (allTransactions, currentDailyLimit, currentGoalSuccessDays) => {
    // 1. Encontra todos os dias únicos com transações (exceto o dia atual)
    const today = new Date().toISOString().split('T')[0];
    const pastTransactionDates = allTransactions
      .map(t => t.date.split('T')[0])
      .filter((date, index, self) => 
        date !== today && self.indexOf(date) === index
      );

    let newSuccessfulDays = [...currentGoalSuccessDays];
    let goalCompletedNow = false;
    
    // 2. Itera sobre cada dia passado
    pastTransactionDates.forEach(date => {
      // Se o dia já foi marcado como sucesso, ignora
      if (currentGoalSuccessDays.includes(date)) return; 
      
      const totalSpentThatDay = allTransactions
        .filter(t => t.date.split('T')[0] === date && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      // 3. Checa o limite (usando o limite atual para simplicidade)
      if (totalSpentThatDay < currentDailyLimit) {
        newSuccessfulDays.push(date);
        goalCompletedNow = true;
      }
    });

    if (goalCompletedNow) {
        // Atualiza o estado de sucesso (será salvo automaticamente pelo useEffect)
        setGoalSuccessDays(newSuccessfulDays); 
        return true; // Retorna true se um novo dia foi completado
    }
    return false;
  };
  
  // --- Funções de Persistência (AsyncStorage) ---

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        setTransactions(parsedData.transactions || []);
        setDailyLimit(parsedData.dailyLimit || 100);
        
        // Carrega dados de gamificação
        setPoints(parsedData.points || 0);
        setGoalSuccessDays(parsedData.goalSuccessDays || []); // 🚨 NOVO DADO CARREGADO
        // Garante que novos desafios sejam incluídos no estado (mantendo o status de completion)
        const savedChallenges = parsedData.challenges || [];
        const updatedChallenges = initialChallenges.map(initial => {
            const saved = savedChallenges.find(s => s.id === initial.id);
            return saved ? saved : initial;
        });
        setChallenges(updatedChallenges);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do AsyncStorage:", error);
    }
  };

  const saveData = async () => {
    try {
      const dataToSave = JSON.stringify({
        transactions,
        dailyLimit,
        points,
        challenges, // Salva os desafios
        goalSuccessDays,
      });
      await AsyncStorage.setItem(STORAGE_KEY, dataToSave);
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadData(); // Carrega ao montar
  }, []);

  useEffect(() => {
    // Salva sempre que qualquer dado importante mudar
    saveData();
  }, [transactions, dailyLimit, points, challenges]); 


  // --- Lógica de Desafios ---

  const checkChallenges = (allTransactions, goalDays) => {
    let newPointsEarned = 0;
    
    // Mapeia os desafios e verifica se foram completados
    const updatedChallenges = challenges.map(challenge => {
        if (challenge.completed) {
            return challenge; // Ignora desafios já completos
        }
        
        let isCompleted = false;
        
        switch (challenge.id) {
            case 'first_expense':
                if (allTransactions.length >= 1) isCompleted = true;
                break;
            case 'five_expenses':
                if (allTransactions.length >= 5) isCompleted = true;
                break;
            case 'under_limit_day':
                // Está completo se houver pelo menos 1 dia de sucesso
                if (goalDays.length >= 1) isCompleted = true; 
                break;
        }
        
        if (isCompleted) {
            newPointsEarned += challenge.points;
            return { ...challenge, completed: true };
        }
        
        return challenge;
    });

    if (newPointsEarned > 0) {
        setPoints(prev => prev + newPointsEarned);
        setChallenges(updatedChallenges);
    }
  };

  // --- Efeitos Colaterais ---

  // Roda a verificação de dias completados sempre que as transações mudam
  useEffect(() => {
    if (transactions.length > 0) {
        // A função retorna true se um novo dia foi bem-sucedido
        const newGoalAchieved = checkPastDaysForGoal(transactions, dailyLimit, goalSuccessDays);
        
        // Se um novo dia de meta foi atingido, re-verifica os desafios.
        if (newGoalAchieved) {
            // Chama a verificação com o estado ATUALIZADO (goalSuccessDays)
            checkChallenges(transactions, goalSuccessDays.length > 0 ? goalSuccessDays : []);
        } else {
            // Caso contrário, apenas verifica os desafios normais de contagem
            checkChallenges(transactions, goalSuccessDays);
        }
    }
  }, [transactions, dailyLimit]); // Roda se transações ou limite mudarem
  
  // --- Funções de Lógica ---

  const addTransaction = (transaction) => {
    // Cria uma nova lista de transações
    const newTransactions = [
        { 
            ...transaction, 
            id: Date.now().toString(), 
            date: new Date().toISOString()
        }, 
        ...transactions
    ];
    
    setTransactions(newTransactions);
    
    // Verifica os desafios logo após adicionar a transação
    checkChallenges(newTransactions);
    
    // Dá 1 ponto por transação, mesmo que não seja um desafio
    setPoints(prev => prev + 1); 
  };
  
  const updateDailyLimit = (newLimit) => {
    setDailyLimit(newLimit);
  };

  // Funções de Lógica (Edição/Exclusão)
  const editTransaction = (updatedTransaction) => {
    setTransactions(prev => 
        prev.map(t => 
            t.id === updatedTransaction.id ? updatedTransaction : t
        )
    );
    // Não é necessário chamar checkChallenges aqui, pois o ponto não muda.
  };
  
  const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
        // Recalcular desafios se a exclusão puder afetar um desafio de contagem (Ex: 5 despesas)
        // Por simplicidade, podemos re-verificar todos os desafios após a exclusão.
        // checkChallenges(transactions.filter(t => t.id !== id)); 
  };  

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        dailyLimit,
        points,
        currentLevel, // Novo
        challenges, // Novo
        addTransaction,
        updateDailyLimit,
        editTransaction, 
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);