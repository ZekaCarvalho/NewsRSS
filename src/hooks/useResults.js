import rssfeed from '../api/rssfeed';
import { useEffect, useState } from 'react';

export default () => {
    const [resultados, setResultados] = useState([]);
    const [msgErro, setErro] = useState(null);
    
    const searchApi = async () => {
        try {
            const response = await rssfeed.get()
            console.log('busca OK')

            setResultados(response.data.feeds)
            setErro(null);
            console.log('setResultados OK')
        }
        catch (err) { 
            setErro('Houve algum erro')
            console.log(err); 
        }
    }
    
    useEffect(() => {
        searchApi('')
    }, []);

    return [searchApi, resultados, msgErro];
}
