import { StyleSheet, type TextStyle, type ViewStyle } from "react-native";
import { theme } from "@/theme";
import { categoryOptions } from "@/constants/categoryOptions";

type CategoryOption = (typeof categoryOptions)[number]["id"];
type CategoryToneStyle = {
  selectedCard: ViewStyle;
  selectedBorder: ViewStyle;
  selectedIconWrap: ViewStyle;
  selectedLabel: TextStyle;
};

const styles = StyleSheet.create({
  categoryOptionsRow: {
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  categoryCard: {
    flex: 1,
    minHeight: 102,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm
  },
  categoryCardDefault: {
    backgroundColor: theme.colors.background
  },
  categoryCardDefaultBorder: {
    borderColor: theme.colors.stroke
  },
  categoryIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center"
  },
  categoryIconWrapDefault: {
    backgroundColor: theme.colors.pill,
    borderColor: theme.colors.stroke
  },
  categoryLabel: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
    textAlign: "center",
    letterSpacing: theme.typography.letterSpacing.tight
  },
  categoryLabelDefault: {
    color: theme.colors.textMuted
  },
  pressed: {
    opacity: 0.86
  }
});

export const toneStylesByCategory: Record<
  CategoryOption,
  CategoryToneStyle
> = {
  Depósito: {
    selectedCard: { backgroundColor: theme.colors.categoryDepositCard },
    selectedBorder: { borderColor: theme.colors.categoryDepositBorder },
    selectedIconWrap: {
      backgroundColor: theme.colors.categoryDepositIconBg,
      borderColor: theme.colors.categoryDepositIconBorder
    },
    selectedLabel: { color: theme.colors.offWhite }
  },
  Saque: {
    selectedCard: { backgroundColor: theme.colors.categoryWithdrawCard },
    selectedBorder: { borderColor: theme.colors.categoryWithdrawBorder },
    selectedIconWrap: {
      backgroundColor: theme.colors.categoryWithdrawIconBg,
      borderColor: theme.colors.categoryWithdrawIconBorder
    },
    selectedLabel: { color: theme.colors.offWhite }
  },
  Transferência: {
    selectedCard: { backgroundColor: theme.colors.categoryTransferCard },
    selectedBorder: { borderColor: theme.colors.categoryTransferBorder },
    selectedIconWrap: {
      backgroundColor: theme.colors.categoryTransferIconBg,
      borderColor: theme.colors.categoryTransferIconBorder
    },
    selectedLabel: { color: theme.colors.offWhite }
  }
};

export default styles;
