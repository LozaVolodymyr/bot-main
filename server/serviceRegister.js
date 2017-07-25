class ServerRegister {

    constructor() {
        this._service = {};
        this._timeout = 30;
    }

    add(intent, port, ip) {
        const key =  intent + ip + port;
        if(!this._service[key]){
            this._service[key] = {
                timestamp: Math.floor(new Date() / 1000),
                ip: ip,
                port: port,
                intent: intent
            }
            console.log(`Added service for intent ${intent} on ${ip}:${port}`);
            this._cleanup();
            return
        }
        this._service[key].timestamp = Math.floor(new Date() / 1000);
        this._cleanup();
        console.log(`Updated service for intent ${intent} on ${ip}:${port}`);
    }

    remove(intent, ip, port) {
        const key =  intent + ip + port;
        console.log(`Removed service for intent ${intent} on ${ip}:${port}`);
        delete this._service[key];
    }

    get(intent){
        this._cleanup();
        for(let key in this._service){
            if(this._service[key].intent === intent) return this._service[key];
        }
        return null;
    }

    _cleanup() {
        let now = Math.floor(new Date / 1000);


        for(let key in this._service){
            if(this._service[key].timestamp + this._timeout < now){
                console.log(`Service was expiried for intent ${this._service[key].intent}`)
                delete this._service[key];
            }
        }
    }

}


module.exports = ServerRegister;