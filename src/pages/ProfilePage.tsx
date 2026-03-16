import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Shield, Bell } from 'lucide-react';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

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

                <div className="bg-white rounded-3xl border border-brand-light shadow-xl p-8 md:p-12">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="h-24 w-24 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border-4 border-white shadow-lg">
                            <User size={48} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-brand-dark">User Profile</h1>
                            <p className="text-brand-dark/60 font-medium">Manage your account settings</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-brand-light/20 border border-brand-light/50 group hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm group-hover:shadow-md transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-wider">Email Address</p>
                                    <p className="text-lg font-bold text-brand-dark text-ellipsis overflow-hidden">user@example.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-brand-light/20 border border-brand-light/50 group hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm group-hover:shadow-md transition-all">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-wider">Security</p>
                                    <p className="text-lg font-bold text-brand-dark text-ellipsis overflow-hidden">Password & Authentication</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-brand-light/20 border border-brand-light/50 group hover:border-brand-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm group-hover:shadow-md transition-all">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-wider">Notifications</p>
                                    <p className="text-lg font-bold text-brand-dark text-ellipsis overflow-hidden">Manage email preferences</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button className="w-full h-14 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 active:scale-[0.98]">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
