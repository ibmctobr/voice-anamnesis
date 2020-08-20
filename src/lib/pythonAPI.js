import axios from 'axios'

export default class PythonAPI{
    constructor(){}
    async callPython(text){
        return axios.post('http://localhost:5000/',{
                text: text,
                language_model: 'pt-en',
                entity_types: 'HealthCondition|Drug|Anatomy'
            });
    }
}