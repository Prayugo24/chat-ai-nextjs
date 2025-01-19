import axios from "axios";

export class ApiChat {
    static async getMessage(message: string):Promise<any> {
        try {
          const response = await axios.get('/api/aichat', {
            params: {
              message
            },
            headers: {
              'Authorization': '', 
              'Content-Type': 'application/json' 
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw error;
        }
    }
}