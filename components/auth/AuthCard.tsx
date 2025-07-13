import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SignUpCardContent } from "./SignUpCardContent";
import { SignInCardContent } from "./SignInCardContent";

interface Props {
  signInCard?: boolean;
}

export const AuthCard = ({ signInCard }: Props) => {
  const t = useTranslations("AUTH");
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo and Brand Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-4 shadow-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Focus<span className="text-primary">ly</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Your all-in-one productivity workspace
        </p>
      </div>

      {/* Main Card */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-semibold text-center">
            {signInCard ? t("SIGN_IN.TITLE") : t("SIGN_UP.TITLE")}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {signInCard ? t("SIGN_IN.DESC") : t("SIGN_UP.DESC")}
          </CardDescription>
        </CardHeader>
        {signInCard ? <SignInCardContent /> : <SignUpCardContent />}
      </Card>

      {/* Footer Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          {signInCard
            ? t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")
            : t("SIGN_UP.HAVE_ACCOUNT.FIRST")}{" "}
          <Link
            className="text-primary hover:text-primary/80 font-medium transition-colors"
            href={signInCard ? "/sign-up" : "/sign-in"}
          >
            {signInCard
              ? t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")
              : t("SIGN_UP.HAVE_ACCOUNT.SECOND")}
          </Link>
        </p>
      </div>
    </div>
  );
};
