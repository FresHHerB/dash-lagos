import { useState, useEffect, useCallback } from 'react';
import { NewReportData, NewApiResponse } from '../types/newReport';

export const useNewReportData = (apiUrl: string) => {
  const [data, setData] = useState<NewReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [rawApiData, setRawApiData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    if (!apiUrl) {
      setError('URL da API não configurada');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fazendo requisição GET para:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Resposta da API:', result);
      
      setRawApiData(result);
      
      // Verifica se o resultado já está no formato NewReportData
      if (result && typeof result === 'object') {
        // Se já tem a estrutura NewReportData diretamente
        if (result.reportTitle && result.executiveSummary) {
          console.log('Dados já no formato NewReportData');
          setData(result as NewReportData);
        }
        // Se tem a estrutura antiga relatorio_de_inteligencia_de_vendas
        else if (result.relatorio_de_inteligencia_de_vendas) {
          console.log('Convertendo de relatorio_de_inteligencia_de_vendas para NewReportData...');
          const oldData = result.relatorio_de_inteligencia_de_vendas;
          // Conversão seria feita aqui se necessário
          setData(null); // Por enquanto, não converte
        }
        // Se é um array, pega o primeiro item
        else if (Array.isArray(result) && result.length > 0) {
          console.log('Resultado é array...');
          if (result.length > 0) {
            console.log('Processando primeiro item do array...');
            const firstItem = result[0];
            if (firstItem.reportTitle && firstItem.executiveSummary) {
              setData(firstItem as NewReportData);
            } else {
              throw new Error('Primeiro item do array não tem formato NewReportData');
            }
          } else {
            setData(null);
            setError('Nenhum relatório disponível. A API retornou um array vazio.');
            return;
          }
        }
        else {
          throw new Error(`Formato de dados não reconhecido. Chaves encontradas: ${Object.keys(result).join(', ')}`);
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