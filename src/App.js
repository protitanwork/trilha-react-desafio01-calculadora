
import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';


const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');
  const [history, setHistory] = useState([]);

  const handleOnClear = () => {
    setCurrentNumber('0')
    setFirstNumber('0')
    setOperation('')
  };

  const handleAddNumber = (num) => {
    setCurrentNumber(prev => `${prev === '0' ? '' : prev}${num}`)
  }

  const handleAddDot = () => {
    setCurrentNumber(prev => {
      if (prev.includes('.')) {
        return prev;
      }
    })
  }

  const handleSumNumbers = () => {

    if(firstNumber === '0'){
        setFirstNumber(String(currentNumber));
        setCurrentNumber('0')
        setOperation('+')
    }else {
      const sum = Number(firstNumber) + Number(currentNumber);
      setCurrentNumber(String(sum))
      setOperation('')
    }

  }

  const handleMinusNumbers = () => {

    if(firstNumber === '0'){
        setFirstNumber(String(currentNumber));
        setCurrentNumber('0')
        setOperation('-')
    }else {
      const sum = Number(firstNumber) - Number(currentNumber);
      setCurrentNumber(String(sum))
      setOperation('')
    }

  }

  const handleMult = () => {
    setFirstNumber(currentNumber);
    setCurrentNumber('0');
    setOperation('*');
  }

  const handleDiv = () => {
  setFirstNumber(currentNumber);
  setCurrentNumber('0');
  setOperation('/');
}

  const handleEquals = () => {
    if(firstNumber !== '0' && operation !== '' && currentNumber !== '0'){
    const first = Number(firstNumber);
    const second = Number(currentNumber);
    let result = 0;

         switch(operation){
      case '+':
        result = first + second;
        break;

      case '-':
        result = first - second;
      break;

      case '*':
        result = firstNumber * second;
        break;

      case '/':
        if(second ===0){
          setCurrentNumber('Erro');
          return;
        }

        result = first / second;
        break;

      default:
        return;
     }
         setHistory(prev => [
      ...prev,
      `${firstNumber} ${operation} ${currentNumber} = ${result}`
    ]);

    setCurrentNumber(String(result));
    setFirstNumber('0');
    setOperation('');

    }

  }

  return (
    <Container>
      <Content>
        <Input value={currentNumber}/>
        <Row>
          <Button label="x" onClick={handleMult} />
          <Button label="/" onClick={handleDiv} />
          <Button label="c" onClick={handleOnClear}/>
          <Button label="." onClick={handleAddDot} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')}/>
          <Button label="9" onClick={() => handleAddNumber('9')}/>
          <Button label="-" onClick={handleMinusNumbers}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')}/>
          <Button label="5" onClick={() => handleAddNumber('5')}/>
          <Button label="6" onClick={() => handleAddNumber('6')}/>
          <Button label="+" onClick={handleSumNumbers}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')}/>
          <Button label="2" onClick={() => handleAddNumber('2')}/>
          <Button label="3" onClick={() => handleAddNumber('3')}/>
          <Button label="=" onClick={handleEquals}/>
        </Row>
      </Content>
      <div>
  <h3>Histórico</h3>

  {history.length === 0 ? (
    <p>Nenhum cálculo ainda</p>
  ) : (
    history.map((item, index) => (
      <p key={index}>{item}</p>
    ))
  )}
</div>
    </Container>
  );
}

export default App;
