import {useNetInfo} from "@react-native-community/netinfo";
import {useT} from "@src/i18n/useTranslation";
import {toast} from "@src/utils/toast";
import {useEffect} from "react";

export function useConnectionAlert() {
  const info = useNetInfo();
  const {t} = useT();
  useEffect(() => {
    if (info.isConnected === false) {
      toast.error(t("noInternetConnection"));
    }
  }, [info.isConnected, t]);
}
