import { auth } from "../routes/firebase";
import { Navigate } from "../routes/firebase"

export default function ProtectedRoute ({children}:{childern: React.ReactNode;}) {
    const user = auth.currentUser;
    if (user === null) {
        return <Navigate to="\login" />;
    }
    return children;
}