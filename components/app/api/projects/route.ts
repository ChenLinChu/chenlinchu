import { NextResponse } from 'next/server';

import { sql } from '@/lib/db';

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            // 查詢單一專案
            const projects = await sql`SELECT * FROM projects WHERE id = ${parseInt(id)}`;
            if (projects.length === 0) {
                return NextResponse.json({ error: 'Project not found' }, { status: 404 });
            }
            return NextResponse.json(projects[0]);
        }

        // 查詢所有專案
        const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
