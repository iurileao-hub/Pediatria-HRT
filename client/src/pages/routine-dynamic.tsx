import { useParams } from "wouter";
import { routineContents } from "../../../shared/routine-content";
import RoutineTemplate from "../components/RoutineTemplate";

export default function RoutineDynamic() {
  const params = useParams<{ id: string }>();
  const routineId = params.id;
  
  const routine = routineContents.find(r => r.id === routineId);
  
  if (!routine) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        color: '#1f2937',
        fontFamily: 'Georgia, serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>
            Rotina não encontrada
          </h1>
          <p style={{ marginBottom: '24px' }}>
            A rotina solicitada não foi encontrada.
          </p>
          <a 
            href="/routines" 
            style={{
              color: '#2563eb',
              textDecoration: 'underline'
            }}
          >
            Voltar para as rotinas
          </a>
        </div>
      </div>
    );
  }

  return (
    <RoutineTemplate
      title={routine.title}
      author={routine.author}
      content={routine.content}
    />
  );
}