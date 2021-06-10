
export default class Remote {

    public static destination = 'http://localhost:8000';

    public static sendPicture(data, callback): void {
        const { destination } = Remote;
        fetch(`${destination}/predict`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => callback(res))
            .catch(e => console.log(e));
    }

    public static checkConnection(callback): void {
        const { destination } = Remote;
        fetch(`${destination}/hello-world`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => callback(res))
            .catch(e => console.log(e));
    }
}