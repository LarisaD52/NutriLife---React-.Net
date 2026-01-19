import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditMemberPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [member, setMember] = useState({
        fullName: '',
        email: '',
        currentWeight: '',
        goal: '',
        nextConsultationDate: ''
    });

    const API_BASE = "https://localhost:5001/api/nutri"; 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!id || id === "undefined") return;

        axios.get(`${API_BASE}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            const data = res.data;
            if (data.nextConsultationDate) {
                data.nextConsultationDate = data.nextConsultationDate.split('T')[0];
            }
            setMember(data);
        })
        .catch(err => console.error("Eroare la încărcare:", err));
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const payload = {
            ...member,
            id: parseInt(id),
            currentWeight: parseFloat(member.currentWeight)
        };

        try {
            await axios.put(`${API_BASE}/${id}`, payload, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            alert("✅ Membru actualizat!");
            navigate('/members');
        } catch (err) {
            console.error("DETALII EROARE:", err.response);
            alert("❌ Eroare la salvare! Serverul a respins cererea.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg mx-auto border-0" style={{ maxWidth: '550px', borderRadius: '20px' }}>
                <div className="card-body p-5">
                    <h3 className="text-center mb-4 fw-bold">📋 Editează Profil</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="fw-bold small">NUME COMPLET</label>
                            <input type="text" className="form-control" value={member.fullName} 
                                   onChange={e => setMember({...member, fullName: e.target.value})} required />
                        </div>
                        <div className="mb-3">
                            <label className="fw-bold small">EMAIL</label>
                            <input type="email" className="form-control" value={member.email} 
                                   onChange={e => setMember({...member, email: e.target.value})} required />
                        </div>
                        <div className="row g-2">
                            <div className="col-6">
                                <label className="fw-bold small">GREUTATE</label>
                                <input type="number" step="0.1" className="form-control" value={member.currentWeight} 
                                       onChange={e => setMember({...member, currentWeight: e.target.value})} required />
                            </div>
                            <div className="col-6">
                                <label className="fw-bold small">OBIECTIV</label>
                                <select className="form-select" value={member.goal} 
                                        onChange={e => setMember({...member, goal: e.target.value})}>
                                    <option value="Slăbire">Slăbire</option>
                                    <option value="Masă Musculară">Masă Musculară</option>
                                    <option value="Menținere">Menținere</option>
                                    {/* CELE DOUĂ OPȚIUNI NOI ADAUGATE MAI JOS */}
                                    <option value="Performanță Sportivă">Performanță Sportivă</option>
                                    <option value="Recuperare">Recuperare</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-3 mb-4">
                            <label className="fw-bold small text-success">DATA CONTROL</label>
                            <input type="date" className="form-control" value={member.nextConsultationDate} 
                                   onChange={e => setMember({...member, nextConsultationDate: e.target.value})} required />
                        </div>
                        <button type="submit" className="btn btn-success btn-lg w-100 fw-bold shadow">SALVEAZĂ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditMemberPage;