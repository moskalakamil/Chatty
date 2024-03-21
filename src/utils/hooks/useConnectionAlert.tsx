import {useNetInfo} from "@react-native-community/netinfo";
import {useEffect} from "react";
import {useT} from "@src/i18n/useTranslation";
import {toast} from "@src/utils/toast";

export function useConnectionAlert() {
  const info = useNetInfo();
  const {t} = useT();
  useEffect(() => {
    if (info.isConnected === false) {
      toast.error(t("noInternetConnection"));
    }
  }, [info.isConnected, t]);
}
