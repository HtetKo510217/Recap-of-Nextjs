import { query } from "@/app/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const sql = "DELETE FROM Products WHERE Id = ?";
    try {
        const result = await query(sql, [id]);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error);
    }

}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const sql = "SELECT * FROM Products WHERE Id = ?";
    try {
        const result = await query(sql, [id]);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error);
    }
}