import { useState, useEffect } from 'react';

// Lista de logos/avatares aleatorios
const LOGOS = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/91.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/22.jpg',
  'https://randomuser.me/api/portraits/men/88.jpg',
];

// Lista de logos alternativos por si fallan las URLs
const FALLBACK_LOGOS = [
  'https://ui-avatars.com/api/?background=6366f1&color=fff&bold=true&size=120&name=CM',
  'https://ui-avatars.com/api/?background=ec4899&color=fff&bold=true&size=120&name=AS',
  'https://ui-avatars.com/api/?background=14b8a6&color=fff&bold=true&size=120&name=RG',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=coach1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=coach2',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=coach3',
];

// Definir el tipo para los testimonios
interface Testimonio {
  nombre: string;
  cargo: string;
  texto: string;
  caso?: string;
}

function AdminPanel() {
  const [logos, setLogos] = useState<string[]>([]);
  const [logosFallback, setLogosFallback] = useState<boolean[]>([]);

  const testimonios: Testimonio[] = [
    { 
      nombre: "Carlos Mendoza", 
      cargo: "CEO, TechLogistics", 
      texto: "Su enfoque de coaching no solo mejoró nuestros procesos, sino que empoderó a todo nuestro equipo directivo. Un verdadero líder que inspira resultados tangibles.",
      caso: "Ver caso completo"
    },
    { 
      nombre: "Ana Silva", 
      cargo: "Directora de Operaciones, GlobalCorp", 
      texto: "El mapeo de procesos que implementó nos permitió identificar cuellos de botella que nos costaban miles de dólares al mes. Su experiencia es invaluable.",
      caso: "Ver caso completo"
    },
    { 
      nombre: "Roberto Gómez", 
      cargo: "Gerente General, Industrias Alimenticias", 
      texto: "La transformación digital que lideró incrementó nuestra eficiencia en un 40%. Un profesional excepcional que recomiendo sin dudar.",
      caso: "Ver caso completo"
    }
  ];

  // Función para asignar logos aleatorios
  const asignarLogosAleatorios = () => {
    const nuevosLogos = testimonios.map(() => 
      LOGOS[Math.floor(Math.random() * LOGOS.length)]
    );
    setLogos(nuevosLogos);
    // Resetear estado de fallback
    setLogosFallback(new Array(testimonios.length).fill(false));
  };

  // Función para manejar error de carga de imagen
  const handleImageError = (index: number) => {
    if (!logosFallback[index]) {
      const nuevoFallback = [...logosFallback];
      nuevoFallback[index] = true;
      setLogosFallback(nuevoFallback);
      
      // Actualizar el logo con uno de fallback
      const nuevosLogos = [...logos];
      const fallbackIndex = Math.floor(Math.random() * FALLBACK_LOGOS.length);
      nuevosLogos[index] = FALLBACK_LOGOS[fallbackIndex];
      setLogos(nuevosLogos);
    }
  };

  // Función para manejar el clic en "Ver caso"
  const handleVerCaso = (testimonio: Testimonio) => {
    console.log(`Ver caso de: ${testimonio.nombre}`);
    // Aquí puedes agregar la lógica para mostrar el caso completo
    // Por ejemplo: abrir un modal, navegar a otra página, etc.
    alert(`Mostrando caso de éxito de ${testimonio.nombre}`);
  };

  useEffect(() => {
    asignarLogosAleatorios();
  }, []);

  return (
    <div className="admin-panel-container" style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>✨ Testimonios de Clientes ✨</h2>
        <button 
          onClick={asignarLogosAleatorios} 
          style={styles.refreshButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🎲 Cambiar Logos Aleatorios
        </button>
      </div>
      
      <div className="testimonios-grid" style={styles.grid}>
        {testimonios.map((item, index) => (
          <div key={index} className="testimonial-card" style={styles.card}>
            <div style={styles.logoContainer}>
              <img 
                src={logos[index] || LOGOS[0]} 
                alt={item.nombre}
                style={styles.logo}
                onError={() => handleImageError(index)}
              />
            </div>
            
            <h3 style={styles.name}>{item.nombre}</h3>
            <p style={styles.role}>{item.cargo}</p>
            
            <p style={styles.testimonialText}>
              "{item.texto}"
            </p>
            
            <button 
              onClick={() => handleVerCaso(item)}
              style={styles.casoButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4338ca';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#4f46e5';
              }}
            >
              {item.caso || 'Ver caso'} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos en línea (puedes moverlos a un archivo CSS si prefieres)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  refreshButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'center',
  },
  logoContainer: {
    width: '100px',
    height: '100px',
    margin: '0 auto 20px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #4f46e5',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '10px 0 5px',
  },
  role: {
    fontSize: '0.875rem',
    color: '#4f46e5',
    fontWeight: '600',
    marginBottom: '15px',
  },
  testimonialText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#4b5563',
    fontStyle: 'italic',
    marginBottom: '20px',
    textAlign: 'center',
  },
  casoButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
};

// Añadir efecto hover con CSS (opcional)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;
document.head.appendChild(styleSheet);

export default AdminPanel;
