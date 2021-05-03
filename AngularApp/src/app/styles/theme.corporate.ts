import { NbJSThemeOptions, CORPORATE_THEME as baseTheme } from '@nebular/theme';

const baseThemeVariables = baseTheme.variables;

export const CORPORATE_THEME = {
  name: 'corporate',
  base: 'corporate',
  variables: {
    temperature: {
      arcFill: [ '#ffa36b', '#ffa36b', '#ff9e7a', '#ff9888', '#ff8ea0' ],
      arcEmpty: baseThemeVariables.bg2,
      thumbBg: baseThemeVariables.bg2,
      thumbBorder: '#ffa36b',
    },

    solar: {
      gradientLeft: baseThemeVariables.primary,
      gradientRight: baseThemeVariables.primary,
      shadowColor: 'rgba(1, 1, 1, 1)',
      secondSeriesFill: baseThemeVariables.bg2,
      radius: ['80%', '90%'],
    },

    traffic: {
      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',

      yAxisSplitLine: 'rgba(1, 1, 1, 1)',

      lineBg: baseThemeVariables.primary,
      lineShadowBlur: '0',
      itemColor: baseThemeVariables.border4,
      itemBorderColor: baseThemeVariables.border4,
      itemEmphasisBorderColor: baseThemeVariables.primaryLight,
      shadowLineDarkBg: 'rgba(1, 1, 1, 1)',
      shadowLineShadow: 'rgba(1, 1, 1, 1)',
      gradFrom: baseThemeVariables.bg,
      gradTo: baseThemeVariables.bg,
    },

    electricity: {
      tooltipBg: baseThemeVariables.bg,
      tooltipLineColor: baseThemeVariables.fgText,
      tooltipLineWidth: '0',
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',

      axisLineColor: baseThemeVariables.border3,
      xAxisTextColor: baseThemeVariables.fg,
      yAxisSplitLine: baseThemeVariables.separator,

      itemBorderColor: baseThemeVariables.primary,
      lineStyle: 'solid',
      lineWidth: '4',
      lineGradFrom: baseThemeVariables.primary,
      lineGradTo: baseThemeVariables.primary,
      lineShadow: 'rgba(1, 1, 1, 1)',

      areaGradFrom: 'rgba(1, 1, 1, 1)',
      areaGradTo: 'rgba(1, 1, 1, 1)',
      shadowLineDarkBg: 'rgba(1, 1, 1, 1)',
    },

    bubbleMap: {
      titleColor: baseThemeVariables.fgText,
      areaColor: baseThemeVariables.bg4,
      areaHoverColor: baseThemeVariables.fgHighlight,
      areaBorderColor: baseThemeVariables.border5,
    },

    profitBarAnimationEchart: {
      textColor: baseThemeVariables.fgText,

      firstAnimationBarColor: baseThemeVariables.primary,
      secondAnimationBarColor: baseThemeVariables.success,

      splitLineStyleOpacity: '1',
      splitLineStyleWidth: '1',
      splitLineStyleColor: baseThemeVariables.separator,

      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '16',
      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipBorderWidth: '1',
      tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
    },

    trafficBarEchart: {
      gradientFrom: baseThemeVariables.warningLight,
      gradientTo: baseThemeVariables.warning,
      shadow: baseThemeVariables.warningLight,
      shadowBlur: '0',

      axisTextColor: baseThemeVariables.fgText,
      axisFontSize: '12',

      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
    },

    countryOrders: {
      countryBorderColor: baseThemeVariables.border4,
      countryFillColor: baseThemeVariables.bg4,
      countryBorderWidth: '1',
      hoveredCountryBorderColor: baseThemeVariables.primary,
      hoveredCountryFillColor: baseThemeVariables.primaryLight,
      hoveredCountryBorderWidth: '1',

      chartAxisLineColor: baseThemeVariables.border4,
      chartAxisTextColor: baseThemeVariables.fg,
      chartAxisFontSize: '16',
      chartGradientTo: baseThemeVariables.primary,
      chartGradientFrom: baseThemeVariables.primaryLight,
      chartAxisSplitLine: baseThemeVariables.separator,
      chartShadowLineColor: baseThemeVariables.primaryLight,

      chartLineBottomShadowColor: baseThemeVariables.primary,

      chartInnerLineColor: baseThemeVariables.bg2,
    },

    echarts: {
      bg: baseThemeVariables.bg,
      textColor: baseThemeVariables.fgText,
      axisLineColor: baseThemeVariables.fgText,
      splitLineColor: baseThemeVariables.separator,
      itemHoverShadowColor: 'rgba(0, 0, 0, 0.5)',
      tooltipBackgroundColor: baseThemeVariables.primary,
      areaOpacity: '0.7',
    },

    chartjs: {
      axisLineColor: baseThemeVariables.separator,
      textColor: baseThemeVariables.fgText,
    },

    orders: {
      tooltipBg: baseThemeVariables.bg,
      tooltipLineColor: 'rgba(1, 1, 1, 1)',
      tooltipLineWidth: '0',
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '20',

      axisLineColor: baseThemeVariables.border4,
      axisFontSize: '16',
      axisTextColor: baseThemeVariables.fg,
      yAxisSplitLine: baseThemeVariables.separator,

      itemBorderColor: baseThemeVariables.primary,
      lineStyle: 'solid',
      lineWidth: '4',

      // first line
      firstAreaGradFrom: baseThemeVariables.bg3,
      firstAreaGradTo: baseThemeVariables.bg3,
      firstShadowLineDarkBg: 'rgba(1, 1, 1, 1)',

      // second line
      secondLineGradFrom: baseThemeVariables.primary,
      secondLineGradTo: baseThemeVariables.primary,

      secondAreaGradFrom: 'rgba(1, 1, 1, 1)',
      secondAreaGradTo: 'rgba(1, 1, 1, 1)',
      secondShadowLineDarkBg: 'rgba(1, 1, 1, 1)',

      // third line
      thirdLineGradFrom: baseThemeVariables.success,
      thirdLineGradTo: baseThemeVariables.successLight,

      thirdAreaGradFrom: 'rgba(1, 1, 1, 1)',
      thirdAreaGradTo: 'rgba(1, 1, 1, 1)',
      thirdShadowLineDarkBg: 'rgba(1, 1, 1, 1)',
    },

    profit: {
      bg: baseThemeVariables.bg,
      textColor: baseThemeVariables.fgText,
      axisLineColor: baseThemeVariables.border4,
      splitLineColor: baseThemeVariables.separator,
      areaOpacity: '1',

      axisFontSize: '16',
      axisTextColor: baseThemeVariables.fg,

      // first bar
      firstLineGradFrom: baseThemeVariables.bg3,
      firstLineGradTo: baseThemeVariables.bg3,
      firstLineShadow: 'rgba(1, 1, 1, 1)',

      // second bar
      secondLineGradFrom: baseThemeVariables.primary,
      secondLineGradTo: baseThemeVariables.primary,
      secondLineShadow: 'rgba(1, 1, 1, 1)',

      // third bar
      thirdLineGradFrom: baseThemeVariables.success,
      thirdLineGradTo: baseThemeVariables.success,
      thirdLineShadow: 'rgba(1, 1, 1, 1)',
    },

    orderProfitLegend: {
      firstItem: baseThemeVariables.success,
      secondItem: baseThemeVariables.primary,
      thirdItem: baseThemeVariables.bg3,
    },

    visitors: {
      tooltipBg: baseThemeVariables.bg,
      tooltipLineColor: 'rgba(1, 1, 1, 1)',
      tooltipLineWidth: '1',
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '20',

      axisLineColor: baseThemeVariables.border4,
      axisFontSize: '16',
      axisTextColor: baseThemeVariables.fg,
      yAxisSplitLine: baseThemeVariables.separator,

      itemBorderColor: baseThemeVariables.primary,
      lineStyle: 'dotted',
      lineWidth: '6',
      lineGradFrom: '#ffffff',
      lineGradTo: '#ffffff',
      lineShadow: 'rgba(1, 1, 1, 1)',

      areaGradFrom: baseThemeVariables.primary,
      areaGradTo: baseThemeVariables.primaryLight,

      innerLineStyle: 'solid',
      innerLineWidth: '1',

      innerAreaGradFrom: baseThemeVariables.success,
      innerAreaGradTo: baseThemeVariables.success,
    },

    visitorsLegend: {
      firstIcon: baseThemeVariables.success,
      secondIcon: baseThemeVariables.primary,
    },

    visitorsPie: {
      firstPieGradientLeft: baseThemeVariables.success,
      firstPieGradientRight: baseThemeVariables.success,
      firstPieShadowColor: 'rgba(1, 1, 1, 1)',
      firstPieRadius: ['65%', '90%'],

      secondPieGradientLeft: baseThemeVariables.warning,
      secondPieGradientRight: baseThemeVariables.warningLight,
      secondPieShadowColor: 'rgba(1, 1, 1, 1)',
      secondPieRadius: ['63%', '92%'],
      shadowOffsetX: '-4',
      shadowOffsetY: '-4',
    },

    visitorsPieLegend: {
      firstSection: baseThemeVariables.warning,
      secondSection: baseThemeVariables.success,
    },

    earningPie: {
      radius: ['65%', '100%'],
      center: ['50%', '50%'],

      fontSize: '22',

      firstPieGradientLeft: baseThemeVariables.success,
      firstPieGradientRight: baseThemeVariables.success,
      firstPieShadowColor: 'rgba(1, 1, 1, 1)',

      secondPieGradientLeft: baseThemeVariables.primary,
      secondPieGradientRight: baseThemeVariables.primary,
      secondPieShadowColor: 'rgba(1, 1, 1, 1)',

      thirdPieGradientLeft: baseThemeVariables.warning,
      thirdPieGradientRight: baseThemeVariables.warning,
      thirdPieShadowColor: 'rgba(1, 1, 1, 1)',
    },

    earningLine: {
      gradFrom: baseThemeVariables.primary,
      gradTo: baseThemeVariables.primary,

      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '16',
      tooltipBg: baseThemeVariables.bg,
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipBorderWidth: '1',
      tooltipExtraCss: 'border-radius: 10px; padding: 4px 16px;',
    },
  },
} as NbJSThemeOptions;
