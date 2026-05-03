import { useState } from 'react'
import axios from 'axios'

function App() {
    const [mensaje, setMensaje] = useState('')
    const [historial, setHistorial] = useState([])
    const [cargando, setCargando] = useState(false)

    const enviarPregunta = async (e) => {
        e.preventDefault()
        if (!mensaje.trim()) return

        // Añadimos tu pregunta al chat
        const nuevaInteraccion = { rol: 'usuario', texto: mensaje }
        setHistorial([...historial, nuevaInteraccion])
        const preguntaActual = mensaje
        setMensaje('')
        setCargando(true)

        try {
            // Llamada a tu servidor de NestJS
            const res = await axios.post('http://localhost:3000/ai/chat', {
                question: preguntaActual
            })

            // Añadimos la respuesta de FerreBot
            setHistorial(prev => [...prev, { rol: 'bot', texto: res.data.answer }])
        } catch (error) {
            console.error("Error:", error)
            setHistorial(prev => [...prev, { rol: 'bot', texto: "Error al conectar con el servidor." }])
        } finally {
            setCargando(false)
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Gramas y Suministros - IA</h1>

            <div style={{
                height: '400px',
                border: '1px solid #ddd',
                overflowY: 'auto',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
            }}>
                {historial.map((item, i) => (
                    <div key={i} style={{
                        marginBottom: '10px',
                        textAlign: item.rol === 'usuario' ? 'right' : 'left'
                    }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '10px',
                            borderRadius: '10px',
                            backgroundColor: item.rol === 'usuario' ? '#007bff' : '#e9ecef',
                            color: item.rol === 'usuario' ? 'white' : 'black',
                            maxWidth: '80%'
                        }}>
                            <strong>{item.rol === 'usuario' ? 'Tú: ' : 'FerreBot: '}</strong>
                            {item.texto}
                        </div>
                    </div>
                ))}
                {cargando && <p>FerreBot está consultando el inventario...</p>}
            </div>

            <form onSubmit={enviarPregunta} style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu duda aquí..."
                    style={{ width: '80%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    disabled={cargando}
                    style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}

export default App