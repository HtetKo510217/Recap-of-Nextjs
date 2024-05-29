import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any) {
    const sql = "SELECT * FROM Products ORDER BY Id DESC";
    const result = await query(sql, "");

    try {
        return NextResponse.json(result);
    }
    catch (error) {
        return NextResponse.json(error);
    }
}

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const sql = "INSERT INTO Products (Name, BuyPrice, SellPrice) VALUES (?, ?, ?)";
    const values = [data.get("Name" || ""), data.get("BuyPrice" || ""), data.get("SellPrice" || "")];
    
    try {
        await query(sql, values);
        return NextResponse.json({
            status : "success",
            message : "Product added successfully",
        });
    }
    catch (error) {
        return NextResponse.json({
            status : "error",
            message : "Something went wrong",
            error,
        });
    }
}

export async function PATCH(req: NextRequest) {
    const data = await req.formData();
    const sql = "UPDATE Products SET Name = ?, BuyPrice = ?, SellPrice = ? WHERE Id = ?";
    const values = [data.get("Name" || ""), data.get("BuyPrice" || ""), data.get("SellPrice" || ""), data.get("id" || "")];
    
    try {
        await query(sql, values);
        return NextResponse.json({
            status : "success",
            message : "Product updated successfully",
        });
    }
    catch (error) {
        return NextResponse.json({
            status : "error",
            message : "Something went wrong",
            error,
        });
    }
}