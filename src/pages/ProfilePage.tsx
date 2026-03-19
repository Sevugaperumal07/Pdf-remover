import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Shield, Bell, Edit3, Check, X } from 'lucide-react';

interface UserData {
    email: string;
    notifications: string;
}

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        email: 'user@example.com',
        notifications: 'Manage email preferences'
    });
    const [originalUserData, setOriginalUserData] = useState<UserData>(userData);

    const handleEdit = () => {
        setOriginalUserData(userData);
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setUserData(originalUserData);
        setIsEditing(false);
    };

    return (
        <div className="flex-1 bg-brand-light/30 min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <button
                    onClick={() => navigate('/edit')}
                    className="flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-accent transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Editor</span>
                </button>

                <div className="bg-brand-surface rounded-3xl border border-border-color shadow-xl p-8 md:p-12">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-6">
                            <div className="h-24 w-24 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border-4 border-brand-surface shadow-lg">
                                <User size={48} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-brand-dark">User Profile</h1>
                                <p className="text-brand-dark/60 font-medium">Manage your account settings</p>
                            </div>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="p-3 rounded-2xl bg-brand-light/30 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                                title="Edit Profile"
                            >
                                <Edit3 size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCancel}
                                    className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                                    title="Cancel"
                                >
                                    <X size={24} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="p-3 rounded-2xl bg-green-50 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group"
                                    title="Save"
                                >
                                    <Check size={24} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-brand-light/20 border border-border-color/50 group hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-surface rounded-xl text-brand-primary shadow-sm group-hover:shadow-md transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-wider">Email Address</p>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={userData.email}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, email: e.target.value })}
                                            className="text-lg font-bold text-brand-dark bg-white border-b-2 border-brand-primary/30 focus:border-brand-primary outline-none py-1 w-full transition-all"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="text-lg font-bold text-brand-dark text-ellipsis overflow-hidden">{userData.email}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-brand-light/20 border border-border-color/50 group hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-surface rounded-xl text-brand-primary shadow-sm group-hover:shadow-md transition-all">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-wider">Security</p>
                                    <p className="text-lg font-bold text-brand-dark text-ellipsis overflow-hidden">Password & Authentication</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-brand-light/20 border border-border-color/50 group hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-surface rounded-xl text-brand-primary shadow-sm group-hover:shadow-md transition-all">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-wider">Notifications</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={userData.notifications}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, notifications: e.target.value })}
                                            className="text-lg font-bold text-brand-dark bg-brand-surface border-b-2 border-brand-primary/30 focus:border-brand-primary outline-none py-1 w-full transition-all"
                                        />
                                    ) : (
                                        <p className="text-lg font-bold text-brand-dark text-ellipsis overflow-hidden">{userData.notifications}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button 
                            onClick={handleSave}
                            className="w-full h-14 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 active:scale-[0.98]"
                        >
                            {isEditing ? 'Save Changes' : 'Profile Settings'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
