// Различия в синтаксисе при импортировании модулей, пакетов - вызывает ошибки в консоли.
//const express = require('express'); // TODO or - удалить! строку "type": "module", в файле package.json
/*
//
import express from 'express'; // TODO or - добавить! строку "type": "module", в файле package.json
import fs from 'fs';
//import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
//app.use(cors());


// если сообщение не в data.js:
//app.get('/api', (req, res) => {
  ////res.send('Working!'); // http://localhost:5000/
  //res.json({
    ////success: true,
    //message: "Hello server!"
  //});
//});

// если сообщение в data.js:
app.get('/api', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK`)
});
//
*/

/*
// TODO - CommonJS:
// если data.json рядом с server.js
const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3001; // Изменено на 3001

app.use(express.json());

app.get('/message', async (req, res) => {
  try {
    const data = await fs.readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//
*/

/*
// если data.json лежит в data
const express = require('express');
const { readFile } = require('fs/promises');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

const dataFolderPath = path.resolve(__dirname, 'data');
const filePath = path.resolve(dataFolderPath, 'data.json');

app.get('/api', async (req, res) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//
*/

// TODO - ES6:
/*
// если data.json рядом с server.js
import express from 'express';
import { readFile } from 'fs/promises';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/api', async (req, res) => {
  try {
    const data = await readFile('data.json', 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
//
*/

/*
// если data.json лежит в data
import express from 'express';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

const dataFolderPath = path.join(__dirname, 'data');
const filePath = path.join(dataFolderPath, 'data.json');

app.get('/api', async (req, res) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
// В ECMAScript 6 (ES6) модулях, __dirname может не поддерживаться стандартным образом
// используем нативные Node.js методы, такие как import.meta.url в комбинации с path.dirname() 
*/


// если data.json лежит в data
import express from 'express';
import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';
import pg from 'pg';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // middleware для разбора JSON-запросов

app.use(express.static('public')); // or
app.use(express.static(path.join(process.cwd(), 'public'))); // or

//TODO подключение к PostgreSQL > 
/*
const db = new pg.Client({
  user: 'postgres',     // Имя пользователя "postgres"
  password: 'postgres',  // Пароль пользователя "postgres"
  database: 'online_store',
});

/*
// syntax variant:
db.connect((err, client) => {
  if (err) throw err;
  console.log('Connected to database', db.database); 
});

db.query('SELECT * FROM types', (err, result) => {
  if(err) throw err;
  console.log(result.rows); 
  db.end(); 
});
//


// syntax variant:
db.connect((err) => {

  if (err) {
    throw err;
  }
  console.log('Connected to database', db.database);

  // Пример выполнения SQL-запроса - types, brands, devices и т.д.  
  db.query('SELECT * FROM types', (queryError, result) => {
  
    if (queryError) {
      console.error('Error executing query:', queryError);
    } else {
      console.log('Query result:', result.rows);
    }
    db.end(); // Закрываем соединение с базой данных после выполнения запроса
    
  });
  
});
*/

/*
// 1-й вариант:
// асинхронная функция запроса к базе данных
const queryDB = async (types) => {
  try {
    const client = new pg.Client({
      user: 'postgres',
      password: 'postgres',
      database: 'online_store',
    });

    await client.connect(); // Устанавливаем соединение с базой данных

    const result = await client.query(types); // Выполняем SQL-запрос

    await client.end(); // Закрываем соединение
    
    console.log('Connected to database', client.database); 
    console.log(result.rows); 
    return result.rows; // Возвращаем результат запроса
  } catch (error) {
    throw error;
  }
};

app.get('/api/types', async (req, res) => {
  try {
    const types = 'SELECT * FROM types'; // SQL-запрос к types, brands...
    const table = await queryDB(types); // Вызываем асинхронную функцию

    res.json(table);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
  }
});
//
*/

/*
// 2-й вариант - рефакторинг:
const { Pool } = pg;
const databaseConfig = {
  user: 'postgres',
  password: 'postgres',
  database: 'online_store',
};

const connectDB = () => {
  // client - это объект, созданный библиотекой pg, 
  // поэтому путь к свойству database будет таким - client.options.database
  const client = new Pool(databaseConfig);
  return client;
};

const executeQuery = async (client, query) => {
  const result = await client.query(query);
  return result.rows;
};

const closeDB = (client) => {
  client.end();
};

const queryDB = async (types) => {
  const client = connectDB();
  try {
    const result = await executeQuery(client, types);
    //console.log('Connected to database', client.database); // неправильное извлечение свойства
    
    // обращение через объект client и св-во options:
    console.log('Connected to database', client.options.database); // or
    
    //console.log('Connected to database', databaseConfig.database); // or - обращение напрямую к объекту
    console.log(result); 
    return result;
  } finally {
    closeDB(client);
  }
};

app.get('/api/types', async (req, res) => {
  try {
    const typesQuery = 'SELECT * FROM types'; // SQL-запрос к types, brands...
    const typesData = await queryDB(typesQuery); // Вызываем асинхронную функцию

    res.json(typesData);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при запросе к базе данных' });
  }
});
//
*/

// 3-й вариант - рефакторинг:
const { Pool } = pg;

const databaseConfig = {
  user: 'postgres',
  password: 'postgres',
  //database: 'online_store',
  //database: 'my_store',
  database: 'my_store_test',
};

const pool = new Pool(databaseConfig);

// Основная функция выполнения запросов к БД:
const queryDB = async (query) => {
  const client = await pool.connect();

  try {
    const result = await client.query(query);
    console.log(result.rows); 
    return result.rows;
  } finally {
    client.release();
  }
};


// обработчик маршрута для получения таблицы:
app.get('/api/furniture', async (req, res) => {
  try {
    const typesQuery = 'SELECT * FROM furniture';
    const typesData = await queryDB(typesQuery);
    console.log('\x1b[1;44mDB: connected\x1b[0m'); // если PostgreSQL запущен
    res.json(typesData);
  } catch (error) { 
    console.error('Ошибка при выполнении запроса к базе данных:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    console.log('\x1b[1;43;97mDB: disconnected\x1b[0m'); // если PostgreSQL остановлен
    //console.log('\x1b[1;43;5;97mDB: disconnected\x1b[0m'); // если PostgreSQL остановлен
    //console.log('\x1b[1;5;89;97mDB: disconnected\x1b[0m'); // если PostgreSQL остановлен
  }
});
//


/*
// обработчик маршрута для получения типов:
app.get('/api/types', async (req, res) => {
  try {
    const typesQuery = 'SELECT * FROM types';
    const typesData = await queryDB(typesQuery);

    res.json(typesData);
  } catch (error) {
    console.error('Ошибка при выполнении запроса к базе данных:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// обработчик маршрута для получения брендов:
app.get('/api/brands', async (req, res) => {
  try {
    const brandsQuery = 'SELECT * FROM brands';
    const brandsData = await queryDB(brandsQuery);

    res.json(brandsData);
  } catch (error) {
    console.error('Ошибка при выполнении запроса к базе данных:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});
//
*/
// < подключение к PostgreSQL TODO


/*
//TODO - test authorization:
app.get('/', async (req, res) => {
  res.send('test');
  console.log(req.body);
});

app.post('/auth/login', async (req, res) => {
  console.log(req.body);
  
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Mike Johnson',
    },
    'secret123',
  );
  
  res.json({
    success: true,
    token,
  });
  
});
//
*/


/*
// CommonJS:
const express = require('express');
//const { readFile } = require('fs').promises; // or
const { readFile } = require('fs/promises');   // or
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('public')); // or
//app.use(express.static(path.join(__dirname, 'public'))); // or

app.get('/api', async (req, res) => {
  try {
    const dataFolderPath = path.join(__dirname, 'data');
    const filePath = path.join(dataFolderPath, 'data.json');
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
//
*/

// TODO - GET
app.get('/api', async (req, res) => {
  try {
    const dataFolderPath = path.join(process.cwd(), 'data');
    const filePath = path.join(dataFolderPath, 'data.json');
    const data = await readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

// TODO - GET
app.get('/api/rest/products', async (req, res) => {

  try {
    const contents = await readFile(path.join(process.cwd(), 'views', 'admin.html'), 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(contents);
  } catch (err) {
    res.status(500).send(err);
  }
  
});

// TODO - GET
app.get('/api/rest/products/data', async (req, res) => {

  try {
    const data = await readFile(path.join(process.cwd(), 'data', 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch data' });
  }
  
});

// TODO - DELETE
app.delete('/api/rest/products/:productName', async (req, res) => {

  try {
    const productName = decodeURIComponent(req.params.productName);
    const dataPath = path.join(process.cwd(), 'data', 'data.json');
    const data = await readFile(dataPath, 'utf8');
    const jsonData = JSON.parse(data);

    // Находим индекс товара по имени
    const productIndex = jsonData.findIndex((product) => product.name === productName);

    if (productIndex !== -1) {
      // Удаляем товар из массива данных
      jsonData.splice(productIndex, 1);

      // Перезаписываем обновленные данные в файл
      await writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf8');
      res.status(204).send();      
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete data' });
  }
    
});

// TODO - POST
app.post('/api/rest/products', async (req, res) => {
  const newProduct = req.body;
  
  try {
    const data = await readFile(path.join(process.cwd(), 'data', 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);

    // Добавляем новый товар в массив данных
    jsonData.push(newProduct);

    // Запись обновленных данных обратно в файл
    await writeFile(path.join(process.cwd(), 'data', 'data.json'), JSON.stringify(jsonData, null, 2), 'utf8');

    res.status(201).json(newProduct); // Успешное добавление
  } catch (err) {
    res.status(500).json({ error: "Unable to add product" });
  }
    
});

//
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} ` +
      `mode on http://localhost:${PORT};` + '\npress Ctrl-C to terminate.');
});

