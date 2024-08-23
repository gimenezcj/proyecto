import config from '../config/config.json';

const Utils={};

Utils.getUrl=()=>{
    return config.SERVER_API_URL.replace('protocol',window.location.protocol);
}

export default Utils;