import { Supplies } from "../models/Supplies";

import * as mysql from "mysql";
import * as util from "util";

export class SuppliesDAO
{
   
    private host:string = "";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "SnowSportsJS";
    private pool = this.initDbConnection();
    
    /**
     * Non-default constructor.
     * 
     * @param host Database Hostname
     * @param username Database Username
     * @param password Database Password
     */
    constructor(host:string, port:number, username:string, password:string)
    {
        // Set all class properties
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.pool = this.initDbConnection();
    }


    public findSupplies(callback: any)
    {
        // List of Artist to return
        let supplies:Supplies[] = [];
        
        // Get a pooled connection to the database, run the query to get all the distinct Supplies, and return the List of Supplies
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Throw error if an error
            if (err) throw err

            // Run query    
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('SELECT * FROM Invintory ORDER BY AMOUNT');
            {
                // Release connection in the pool
                connection.release();

                // Throw error if an error
                if (err) throw err
    
                // Loop over result set and save the Supplies Name in the List of Supplies
                for(let x=0;x < result1.length;++x)
                {
                    supplies.push(new Supplies(result1[x].ID, result1[x].Name, result1[x].Description, result1[x].Amount));
                }
    
                // Do a callback to return the results
                callback(supplies);
            };
    
        });
     }


    /**
     * CRUD method to create some supplies.
     * 
     * @param supplies Album to insert.
     * @param callback Callback function with -1 if an error else Album ID created.  
     */
    public create(supplies:Supplies, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
            if (err) throw err;

            // Use Promisfy Util to make an async function and insert Album
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO Invintory (ID, NAME, DESCRIPTION, AMOUNT) VALUES(?,?,?,?)', [supplies.$ID, supplies.$Name, supplies.$Description, supplies.$Amount]);
            if(result1.affectedRows != 1)
               callback(-1);

            // Use Promisfy Util to make an async function and run query to insert all Tracks for this Album
            let suppliesID = result1.insertId;
            

            // Do a callback to return the results
            callback(suppliesID);
        });
    }

    /**
     * CRUD method to update supplies.
     * 
     * @param supplies Album to update.
     * @param callback Callback function with number of rows updated.  
     */
    public update(supplies:Supplies, callback: any)
    {
         // Get pooled database connection and run queries   
         this.pool.getConnection(async function(err:any, connection:any)
         {
             // Release connection in the pool
             connection.release();
 
             // Throw error if an error
            if (err) throw err;
 
             // Use Promisfy Util to make an async function and update Album
             let changes = 0;
             connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE Invintory SET NAME=?, DESCRIPTION=?, AMOUNT=? WHERE ID=?', [supplies.$Name, supplies.$Description, supplies.$Amount, supplies.$ID]);
            if(result1.changedRows != 0)
                ++changes;                                                                                                                                                                       
 
            // Do a callback to return the results
            callback(changes);
         });
     }

     /**
     * CRUD method to delete an Album.
     * 
     * @param supplies Album ID to delete.
     * @param callback Callback function with number of rows deleted.  
     * */
    public delete(suppliesId:number, callback: any)
    {
        // Get pooled database connection and run queries   
        this.pool.getConnection(async function(err:any, connection:any)
        {
            // Release connection in the pool
            connection.release();

            // Throw error if an error
           if (err) throw err;

            // Use Promisfy Util to make an async function and run query to delete the tracks for an Album
            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('DELETE FROM Invintory WHERE ID=?', [suppliesId]);
            changes = changes + result1.affectedRows;


            // Do a callback to return the results
            callback(changes);
        });
    }

    // //* **************** Private Helper Methods **************** */

    // /**
    //  * Private helper method to initialie a Database Connection
    //  */
    private initDbConnection():any
    {
        return mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
    }
}
