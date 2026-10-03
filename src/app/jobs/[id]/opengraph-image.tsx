import { ImageResponse } from 'next/og';
import prisma from "@/lib/prisma";

export const alt = 'Job Opportunity at Ruchitha Associates';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = await prisma.job.findUnique({ where: { id: resolvedParams.id } });

  if (!job) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', background: '#0f172a', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', fontSize: 60, fontWeight: 900 }}>Job Not Found</h1>
        </div>
      )
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '80px',
          background: 'linear-gradient(to bottom right, #0047AB, #0f172a)',
          color: 'white',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
             <span style={{ padding: '8px 24px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '40px', fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' }}>
               {job.category}
             </span>
             <span style={{ fontSize: 28, color: '#94a3b8' }}>•</span>
             <span style={{ fontSize: 28, color: '#e2e8f0', fontWeight: 'bold' }}>{job.type}</span>
          </div>
          
          <h1 style={{ fontSize: 72, fontWeight: 900, marginBottom: '20px', lineHeight: 1.1 }}>
            {job.title}
          </h1>
          
          <h2 style={{ fontSize: 40, color: '#93c5fd', fontWeight: 600 }}>
            {job.company}
          </h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: 32, fontWeight: 'bold', color: '#f8fafc' }}>📍 {job.location}</span>
            <span style={{ fontSize: 28, color: '#cbd5e1' }}>💰 {job.salary}</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 24, color: '#94a3b8', marginBottom: '8px' }}>Apply now at</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: 'white' }}>Ruchitha Associates</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
