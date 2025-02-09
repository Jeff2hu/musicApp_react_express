import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const handleSignInWithGoogle = async () => {
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={handleSignInWithGoogle}
      className="w-full text-white bg-zinc-900/50 h-11 transition-all duration-300 hover:bg-zinc-600/70"
    >
      SignIn with Google
      <img src="/google.png" alt="google" className="size-4 ml-2" />
    </Button>
  );
};

export default SignInOAuthButton;
