import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';

/**
 * ActivationHandler Component
 * * Logic:
 * 1. Checks URL for 'activationSuccess' status.
 * 2. Displays a custom, stylized success toast or banner.
 * 3. Removes the query parameters from the URL to keep it clean.
 */
const ActivationHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const status = searchParams.get('status');
    const msg = searchParams.get('msg');

    if (status === 'activationSuccess') {
      const displayMsg = decodeURIComponent(msg || 'Your account is now active!');
      setMessage(displayMsg);
      
      // Option 1: Using Sonner (Cleanest if you already have it)
      toast.success('Account Activated!', {
        description: displayMsg,
        duration: 6000,
      });

      // Option 2: Internal State for a custom "Welcome Banner"
      setIsVisible(true);

      // Clean the URL immediately without reloading the page
      // This changes ".../?status=..." to just "..."
      const newUrl = window.location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, [searchParams, navigate]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="mx-4 bg-white border-l-4 border-green-500 rounded-lg shadow-2xl p-4 flex items-start gap-4 ring-1 ring-black/5">
        <div className="bg-green-100 p-2 rounded-full">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900">Welcome to BloodBridge!</h3>
          <p className="text-sm text-gray-600 mt-1">
            {message} You can now log in and start saving lives.
          </p>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ActivationHandler;
