import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProfile = async (profileContextJson: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Você é um Engenheiro de Software Sênior experiente e Tech Lead.
        Analise o seguinte perfil do GitHub em formato JSON.
        
        Dados do Perfil: ${profileContextJson}
        
        Por favor, forneça uma análise profissional em PORTUGUÊS com a seguinte estrutura:
        1. **Resumo do Desenvolvedor**: Que tipo de desenvolvedor ele parece ser com base nos repositórios e linguagens? (Ex: Fullstack, Backend, Focado em dados, etc).
        2. **Pontos Fortes**: O que se destaca positivamente?
        3. **Sugestão de Carreira**: Baseado no que você vê, qual seria um bom próximo passo ou tecnologia para aprender?
        4. **Ideia de Projeto**: Sugira uma ideia de projeto que combine as tecnologias atuais do usuário com algo novo.

        Mantenha o tom encorajador, técnico mas acessível. Use Markdown para formatação.
      `,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Gemini Profile Analysis Error:", error);
    throw new Error("Falha na conexão com a IA.");
  }
};

export const analyzeRepo = async (repoContextJson: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Você é um especialista em código Open Source. Analise os metadados deste repositório GitHub (fornecido em JSON) e dê um feedback curto e direto.

        Dados do Repositório: ${repoContextJson}

        Forneça a resposta em PORTUGUÊS com os seguintes pontos:
        1. **Objetivo Percebido**: O que este projeto parece fazer?
        2. **Stack Tecnológica**: Comentário breve sobre a linguagem principal.
        3. **Dicas de Melhoria**: 2 ou 3 sugestões rápidas para tornar o repositório mais atraente (Ex: melhorar README, adicionar testes, tópicos, etc).
        
        Seja conciso. Use Markdown.
      `,
    });

    return response.text || "Não foi possível analisar o repositório.";
  } catch (error) {
    console.error("Gemini Repo Analysis Error:", error);
    throw new Error("Falha na conexão com a IA.");
  }
};