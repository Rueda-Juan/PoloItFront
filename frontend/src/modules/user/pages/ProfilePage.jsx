import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
// --- ¡CAMBIO! Actualizamos la ruta de importación ---
import { getUserById } from '../../../api/apiUser'; 
import Loader from '../../../components/Loader';
import { FiUser, FiMail, FiEdit } from 'react-icons/fi';

// (El resto del componente ProfilePage.jsx que te di antes
// funciona perfectamente sin cambios, ya que 'getUserById'
// se llama igual)
// ...
function ProfilePage() {
  const { userId } = useParams();
  const { user: loggedInUser, loading: authLoading } = useAuth();
  
  const [profileUser, setProfileUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMyProfile = loggedInUser && loggedInUser.id === userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setError(null);
        const userData = await getUserById(userId);
        setProfileUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (authLoading || profileLoading) {
    return <Loader />;
  }
  // ... (El resto del JSX es idéntico al que te di antes)
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* ... (JSX del perfil) ... */}
    </div>
  );
}

export default ProfilePage;