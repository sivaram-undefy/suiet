import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {coreApi} from "@suiet/core";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store";
import {useState} from "react";
import SetPassword from "../SetPassword";
import ImportPhrase from "../ImportPhrase";
import {isNonEmptyArray} from "../../../utils/check";
import toast from "../../../components/toast";
import {updateAccountId, updateInitialized, updateToken, updateWalletId} from "../../../store/app-context";

const ImportWallet = () => {
  const [step, setStep] = useState(1);
  const [secret, setSecret] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const appContext = useSelector((state: RootState) => state.appContext)
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      secret: ''
    }
  })

  async function createWalletAndAccount(token: string, mnemonic: string) {
    const wallet = await coreApi.createWallet({
      token: token,
      mnemonic: mnemonic,
    });
    const accounts = await coreApi.getAccounts(wallet.id);
    if (!isNonEmptyArray(accounts)) {
      toast.success('Cannot find any account')
      throw new Error('Cannot find any account');
    }
    const defaultAccount = accounts[0];
    await dispatch(updateWalletId(wallet.id));
    await dispatch(updateAccountId(defaultAccount.id));
  }

  async function handleImport(_secret: string) {
    if (!appContext.token) {
      // first time to import
      setSecret(_secret);
      setStep(2);
      return;
    }

    // already has token
    await createWalletAndAccount(appContext.token, _secret);
    navigate('/');
  }

  async function handleSetPassword(password: string) {
    await coreApi.updatePassword(null, password);
    const token = await coreApi.loadTokenWithPassword(password);
    await createWalletAndAccount(token, secret);
    await dispatch(updateToken(token));
    await dispatch(updateInitialized(true));
    navigate('/');
  }

  switch (step) {
    case 2: return <SetPassword onNext={handleSetPassword} />
    default: return <ImportPhrase onImported={handleImport} />
  }
}

export default ImportWallet;