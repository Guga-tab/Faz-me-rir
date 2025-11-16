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
  
  // Calcula o nível e o progresso XP atual
  const currentLevel = calculateLevel(points);
  
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

  const checkChallenges = (allTransactions) => {
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
            // Outros desafios podem ser adicionados aqui
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
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);