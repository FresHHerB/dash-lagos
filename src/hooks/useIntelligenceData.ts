import { useState, useEffect, useCallback } from 'react';
import { IntelligenceReport, ApiResponse } from '../types/intelligence';

export const useIntelligenceData = (apiUrl: string) => {
  const [data, setData] = useState<IntelligenceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [rawApiData, setRawApiData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    // Use a URL configurada ou fallback para localhost
    const finalApiUrl = apiUrl || '/api/relatorios';
    
    if (!finalApiUrl) {
      setError('URL da API não configurada');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fazendo requisição para:', finalApiUrl);
      
      const response = await fetch(finalApiUrl, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Resposta da API:', result);
      
      // Armazena os dados brutos da API
      setRawApiData(result);
      
      // Verifica se a resposta tem o formato esperado
      if (result && typeof result === 'object') {
        // Verifica se é um array (formato da resposta atual da API)
        if (Array.isArray(result) && result.length > 0) {
          const firstItem = result[0];
          if (firstItem && firstItem.dados_recebidos && firstItem.dados_recebidos.relatorio_de_inteligencia_de_vendas) {
            setData(firstItem.dados_recebidos as IntelligenceReport);
          } else if (firstItem && firstItem.relatorio_de_inteligencia_de_vendas) {
            // Caso o primeiro item já seja o relatório diretamente
            setData(firstItem as IntelligenceReport);
          } else {
            console.log('Primeiro item do array:', firstItem);
            throw new Error('Formato de dados não reconhecido - Array sem estrutura esperada');
          }
        }
        // Se a resposta contém dados_recebidos (formato da API atual)
        else if (result.dados_recebidos && result.dados_recebidos.relatorio_de_inteligencia_de_vendas) {
          setData(result.dados_recebidos as IntelligenceReport);
        }
        // Se a resposta já está no formato direto
        else if (result.relatorio_de_inteligencia_de_vendas) {
          setData(result as IntelligenceReport);
        }
        else {
          console.log('Estrutura recebida:', Object.keys(result));
          throw new Error(`Formato de dados não reconhecido - estrutura inesperada. Chaves encontradas: ${Object.keys(result).join(', ')}`);
        }
      } else {
        throw new Error('Resposta da API inválida');
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    rawApiData
  };
};