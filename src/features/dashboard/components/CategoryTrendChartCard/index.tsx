import React, { useMemo, useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";
import type { TransactionCategorySeries } from "../../mocks";
import styles from "./styles";

type Props = {
  title: string;
  monthLabel: string;
  yTicks: readonly number[];
  series: readonly TransactionCategorySeries[];
};

type Size = { width: number; height: number };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const buildVictoryLineData = (values: number[], minY: number, maxY: number) => {
  const count = values.length;
  if (count < 2) return [];

  return values.map((v, idx) => {
    const x = idx / (count - 1);
    return { x, y: clamp(v, minY, maxY) };
  });
};

export const CategoryTrendChartCard = ({
  title,
  monthLabel,
  yTicks,
  series
}: Props) => {
  const [plotSize, setPlotSize] = useState<Size>({ width: 0, height: 0 });
  const maxY = yTicks[yTicks.length - 1] ?? 1;
  const minY = yTicks[0] ?? 0;

  const onLayoutPlot = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== plotSize.width || height !== plotSize.height) setPlotSize({ width, height });
  };

  const victoryLines = useMemo(
    () =>
      series
        .map((s) => ({
          id: s.id,
          color: s.color,
          data: buildVictoryLineData(s.points, minY, maxY)
        }))
        .filter((s) => s.data.length >= 2),
    [series, minY, maxY]
  );

  return (
    <View style={[styles.card, { overflow: "hidden" }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{monthLabel}</Text>

      <View style={styles.chartRow}>
        <View style={styles.yAxis}>
          {[...yTicks].reverse().map((t) => (
            <Text key={t} style={styles.yTick}>
              {t}
            </Text>
          ))}
        </View>

        <View style={styles.plot} onLayout={onLayoutPlot}>
          {plotSize.width > 0 && (
            <View pointerEvents="none" style={{ flex: 1 }}>
              <VictoryChart
                width={plotSize.width}
                height={plotSize.height}
                padding={{ left: 0, right: 0, top: 0, bottom: 0 }}
                domain={{ x: [0, 1], y: [minY, maxY] }}
                animate={false}
              >
                {victoryLines.map((s) => (
                  <VictoryLine
                    key={s.id}
                    data={s.data}
                    x="x"
                    y="y"
                    interpolation="linear"
                    style={{
                      data: {
                        stroke: s.color,
                        strokeWidth: 2,
                        strokeLinecap: "round"
                      }
                    }}
                  />
                ))}
              </VictoryChart>
            </View>
          )}
        </View>
      </View>

      <View style={styles.legend}>
        {series.map((s) => (
          <View key={s.id} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: s.color }]} />
            <Text style={styles.legendLabel}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
