import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinanceContext = createContext();
const STORAGE_KEY = '@FazMeRirApp:data';

const initialChallenges = [
  { 
    id: 'first_expense', 
    title: 'Primeiro Passo', 
    description: 'Registre sua primeira despesa.', 
    points: 10, 
    completed: false 
  },
  { 
    id: 'five_expenses', 
    title: 'Melhorando...', 
    description: 'Registre 5 despesas no total.', 
    points: 50, 
    completed: false 
  },
  { 
    id: 'under_limit_day', 
    title: 'Daily Master', 
    description: 'Finalize um dia abaixo do limite diário', 
    points: 100, 
    completed: false 
  },
];

const calculateLevel = (points) => Math.floor(Math.sqrt(points / 100)) + 1;

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [dailyLimit, setDailyLimit] = useState(100);
  const [points, setPoints] = useState(0);
  const [challenges, setChallenges] = useState(initialChallenges);
  const [goalSuccessDays, setGoalSuccessDays] = useState([]);
  const currentLevel = calculateLevel(points);

  const checkPastDaysForGoal = (allTransactions, currentDailyLimit, currentGoalSuccessDays) => {
    const today = new Date().toISOString().split('T')[0];
    const pastTransactionDates = allTransactions
      .map(t => t.date.split('T')[0])
      .filter((date, index, self) => 
        date !== today && self.indexOf(date) === index
      );

    let newSuccessfulDays = [...currentGoalSuccessDays];
    let goalCompletedNow = false;

    pastTransactionDates.forEach(date => {
      if (currentGoalSuccessDays.includes(date)) return; 
      
      const totalSpentThatDay = allTransactions
        .filter(t => t.date.split('T')[0] === date && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      if (totalSpentThatDay < currentDailyLimit) {
        newSuccessfulDays.push(date);
        goalCompletedNow = true;
      }
    });

    if (goalCompletedNow) {
        setGoalSuccessDays(newSuccessfulDays); 
        return true;
    }
    return false;
  };

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        setTransactions(parsedData.transactions || []);
        setDailyLimit(parsedData.dailyLimit || 100);
        setPoints(parsedData.points || 0);
        setGoalSuccessDays(parsedData.goalSuccessDays || []);
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
        challenges,
        goalSuccessDays,
      });
      await AsyncStorage.setItem(STORAGE_KEY, dataToSave);
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [transactions, dailyLimit, points, challenges]); 

  const checkChallenges = (allTransactions, goalDays) => {
    let newPointsEarned = 0;

    const updatedChallenges = challenges.map(challenge => {
        if (challenge.completed) {
            return challenge;
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

  useEffect(() => {
    if (transactions.length > 0) {
        const newGoalAchieved = checkPastDaysForGoal(transactions, dailyLimit, goalSuccessDays);
        if (newGoalAchieved) {
            checkChallenges(transactions, goalSuccessDays.length > 0 ? goalSuccessDays : []);
        } else {
            checkChallenges(transactions, goalSuccessDays);
        }
    }
  }, [transactions, dailyLimit]);

  const addTransaction = (transaction) => {
    const newTransactions = [
        { 
            ...transaction, 
            id: Date.now().toString(), 
            date: new Date().toISOString()
        }, 
        ...transactions
    ];
    
    setTransactions(newTransactions);
    checkChallenges(newTransactions);
    setPoints(prev => prev + 1); 
  };
  
  const updateDailyLimit = (newLimit) => {
    setDailyLimit(newLimit);
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(prev => 
        prev.map(t => 
            t.id === updatedTransaction.id ? updatedTransaction : t
        )
    );
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
        currentLevel,
        challenges,
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