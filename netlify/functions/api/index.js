// Função de exemplo para a API
const { Client } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  // Configuração do cliente do banco de dados Neon
  const client = new Client(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    
    // Exemplo de consulta
    const result = await client.query('SELECT NOW()');
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Conexão com o banco de dados estabelecida com sucesso!',
        data: result.rows[0]
      })
    };
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erro ao conectar ao banco de dados',
        details: error.message 
      })
    };
  } finally {
    await client.end();
  }
};
