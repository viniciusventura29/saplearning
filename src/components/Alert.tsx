import { create } from "zustand";
import { CheckIcon } from "../icons/CheckIcon";
import { ErrorIcon } from "../icons/ErrorIcon";
import { WarningIcon } from "../icons/WarningIcon";

type AlertsTypes = "success" | "error" | "warning";

type UseAlertStore = {
  alertText: string;
  type: AlertsTypes;
  isShowing: boolean;
  trigger: (opts: {
    type?: AlertsTypes;
    text: string;
    isShowing: boolean;
    duration?: number;
  }) => void;
};

export const useAlertStore = create<UseAlertStore>()((set) => ({
  alertText: "",
  type: "success",
  isShowing: false,
  trigger: ({ duration = 2000, type = "success", text }) => {
    set((_state) => ({
      alertText: text,
      type: type,
      isShowing: true,
    }));
    setTimeout(() => {
      set((_state) => ({
        alertText: text,
        type: type,
        isShowing: false,
      }));
    }, duration);
  },
}));

export const useAlert = () => useAlertStore((state) => state.trigger);

export function Alert() {
  const { alertText, isShowing, type } = useAlertStore();
  return (
    <div
      id="toast-success"
      className={`fixed top-28 z-50 right-5 items-center w-full max-w-sm p-4 mb-4 text-gray-500 bg-white rounded-lg border shadow dark:text-gray-400 dark:bg-gray-800 ${
        isShowing ? "flex" : "hidden"
      }`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200 ${
          type === "success" ? "" : "hidden"
        }`}
      >
        <CheckIcon className="" />
        <span className="sr-only">Check icon</span>
      </div>
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200 ${
          type === "error" ? "" : "hidden"
        }`}
      >
        <ErrorIcon />
        <span className="sr-only">Error icon</span>
      </div>
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200 ${
          type === "warning" ? "" : "hidden"
        }`}
      >
        <WarningIcon />
        <span className="sr-only">Warning icon</span>
      </div>
      <div className="ml-3 font-normal">{alertText}</div>
    </div>
  );
}
