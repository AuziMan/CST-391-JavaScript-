import number from "core-js/core/number";
import string from "core-js/core/string";
//import { construct, constructor } from "core-js/fn/reflect";

export class Supplies
{
    private id: number = -1;
    private Name: string = "";
    private Description: string = "";
    private Amount: number = -1;


    constructor(id:number, Name:string, Description:string, Amount:number)
    {
        this.id = id;
        this.Name = Name;
        this.Description = Description;
        this.Amount = Amount;
    
    }


    /**
     * Getter $id
     * @return {number }
     */
	public get $ID(): number  {
		return this.id;
	}

    /**
     * Getter $Name
     * @return {string }
     */
	public get $Name(): string  {
		return this.Name;
	}

    /**
     * Getter $Description
     * @return {string }
     */
	public get $Description(): string  {
		return this.Description;
	}

    /**
     * Getter $amount
     * @return {number }
     */
	public get $Amount(): number  {
		return this.Amount;
	}

    /**
     * Setter $id
     * @param {number } value
     */
	public set $ID(value: number ) {
		this.id = value;
	}

    /**
     * Setter $Name
     * @param {string } value
     */
	public set $Name(value: string ) {
		this.Name = value;
	}

    /**
     * Setter $Description
     * @param {string } value
     */
	public set $Description(value: string ) {
		this.Description = value;
	}

    /**
     * Setter $amount
     * @param {number } value
     */
	public set $Amount(value: number ) {
		this.Amount = value;
	}

}