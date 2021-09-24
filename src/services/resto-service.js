export default class Service {
    async getMenuItems() {
        const promise = await fetch('http://localhost:3000/menu');

        if (!promise.ok){
            throw new Error('Server Error');
        }

        return await promise.json();
        
    }
}




