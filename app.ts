import express, {Request, Response} from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hi');
});

const PORT: number = 8001;

app.listen(PORT, ()=>{
  console.log('listening on 81');
});
