const pg = require('pg');


function criacliente()
{
   return client = new pg.Client({
        user:'pyfadnqp',
        host:'kashin.db.elephantsql.com',
        database:'pyfadnqp',
        password:'VnSDoIeTm8Xy7ZCYZV-5w5HU8zARX0po',
        port:5432,
    })
    
}
async function inserir(nome,pontos)
{   
    var client = await criacliente();
    queryinserir = 'INSERT INTO ranking (nome,pontos) VALUES ($1,$2)'
    await client.connect()
    
    try{
        await client.query(queryinserir,[nome,pontos])

    }
    catch(err)
    {
        if(err.code == 23505)
        { 
            console.log('Nome já cadastrado. Os novos dados irão sobrepor os existentes');
            await update(nome,pontos);          
        }   
    }
    finally
    {
        await client.end()
   
    }

}

async function update(nome,pontos)
{   var client = await criacliente();
    await client.connect();
    queryupdate = 'UPDATE ranking SET pontos=$1 WHERE nome=$2'
    try{
        await client.query(queryupdate,[pontos,nome])

    }
    finally
    {
        await client.end();
    }
}

inserir('doarda',111);

async function deletar(nome)
{
    querydelete = 'DELETE from ranking WHERE nome=$1';

    var client = await criacliente()
    await client.connect();
    try
    {
        await client.query(querydelete,[nome])
    }
    catch(err)
    {
        console.log(err);
    }
    finally
    {
        await client.end();
    }
}



