import { AppleLogo } from "../svg/AppleLogo";
import { GithubLogo } from "../svg/GithubLogo";
import { GoogleLogo } from "../svg/GoogleLogo";
import { ProviderSignInBtn } from "./ProviderSignInBtn";
import { useTranslations } from "next-intl";

export const ProviderSignInBtns = ({
  signInCard,
  disabled,
  onLoading,
}: {
  signInCard?: boolean;
  disabled?: boolean;
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const t = useTranslations("AUTH");
  return (
    <div className="flex flex-col gap-3">
      <ProviderSignInBtn
        disabled={disabled}
        onLoading={onLoading}
        providerName="google"
        className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <GoogleLogo className="mr-3" width={20} height={20} />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GOOGLE")
          : t("SIGN_UP.PROVIDERS.GOOGLE")}
      </ProviderSignInBtn>
      
      <ProviderSignInBtn
        disabled={disabled}
        onLoading={onLoading}
        providerName="github"
        className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
      >
        <GithubLogo className="fill-white mr-3" width={20} height={20} />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GITHUB")
          : t("SIGN_UP.PROVIDERS.GITHUB")}
      </ProviderSignInBtn>
    </div>
  );
};
