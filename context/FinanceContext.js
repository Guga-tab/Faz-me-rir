import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Crie o Contexto
const FinanceContext = createContext();

// Chave para AsyncStorage
const STORAGE_KEY = '@FazMeRirApp:data';

export const FinanceProvider = ({ children }) => {
  // Estado que será globalmente compartilhado
  const [transactions, setTransactions] = useState([]);
  const [dailyLimit, setDailyLimit] = useState(100);
  const [points, setPoints] = useState(0);

  // --- Funções de Persistência (AsyncStorage) ---

  // 1. Carregar Dados ao Iniciar
  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        // Garante que o estado seja preenchido com dados existentes
        setTransactions(parsedData.transactions || []);
        setDailyLimit(parsedData.dailyLimit || 100);
        setPoints(parsedData.points || 0);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do AsyncStorage:", error);
    }
  };

  // 2. Salvar Dados Sempre que o Estado Mudar
  const saveData = async () => {
    try {
      const dataToSave = JSON.stringify({
        transactions,
        dailyLimit,
        points,
      });
      await AsyncStorage.setItem(STORAGE_KEY, dataToSave);
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
    }
  };

  // Efeitos colaterais
  useEffect(() => {
    loadData(); // Carrega ao montar
  }, []);

  useEffect(() => {
    // Salva sempre que transactions, dailyLimit ou points mudarem
    if (transactions.length > 0 || dailyLimit !== 100 || points !== 0) {
        saveData();
    }
  }, [transactions, dailyLimit, points]);

  // --- Funções de Lógica ---

  const addTransaction = (transaction) => {
    // Adiciona a nova transação no início da lista (mais recentes primeiro)
    setTransactions(prev => [
        { 
            ...transaction, 
            id: Date.now().toString(), // ID único
            date: new Date().toISOString()
        }, 
        ...prev
    ]);
    
    // Lógica de gamificação simples: ganhar 1 ponto por transação
    setPoints(prev => prev + 1); 
  };
  
  // Função para usar na tela de Goals
  const updateDailyLimit = (newLimit) => {
    setDailyLimit(newLimit);
  };
  
  // Você adicionará mais funções aqui (ex: updatePoints, deleteTransaction, etc.)

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        dailyLimit,
        points,
        addTransaction,
        updateDailyLimit,
        // ... outras funções e estados
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

// Hook customizado para fácil acesso ao contexto
export const useFinance = () => useContext(FinanceContext);