import { useMemo } from "react";
import { dashboardMock } from "../mocks";

export const useDashboardMock = () => {
  return useMemo(() => dashboardMock, []);
};

