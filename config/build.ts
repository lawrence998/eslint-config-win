/* eslint-disable @typescript-eslint/no-require-imports */
import pkg from '../package.json';

export const NAMESPACE_CONFIG = {
    style: {
        /** bad.js good.js 的后缀 */
        exampleExtension: 'css',
        /** Prism 语言设置 */
        prismLanguage: 'css',
        /** 插件前缀 */
        rulePrefix: '',
        /** 规则配置 */
        ruleConfig: require('./rules/style.json'),
        /** 各插件的文档地址 */
        getDocsUrl: (rule: string) => `https://stylelint.io/user-guide/rules/${rule}`,
        /** 插件的名称 */
        pluginName: undefined
    },
    base: {
        /** bad.js good.js 的后缀 */
        exampleExtension: 'js',
        /** Prism 语言设置 */
        prismLanguage: 'js',
        /** 插件前缀 */
        rulePrefix: '',
        /** 规则配置 */
        ruleConfig: require('./rules/base.json'),
        /** 各插件的文档地址 */
        getDocsUrl: (rule: string) => `https://eslint.org/docs/rules/${rule}`,
        /** 插件的名称 */
        pluginName: undefined
    },
    vue: {
        exampleExtension: 'vue',
        prismLanguage: 'html',
        rulePrefix: 'vue/',
        ruleConfig: require('./rules/vue.json'),
        getDocsUrl: (rule: string) =>
            `https://eslint.vuejs.org/rules/${rule.replace(/.*\//, '')}.html`,
        pluginName: 'eslint-plugin-vue'
    }
};

export type Namespace = keyof typeof NAMESPACE_CONFIG;
export const NAMESPACES = Object.keys(NAMESPACE_CONFIG) as Namespace[];

/** 写入 eslintrc 中的元信息 */
export function buildEslintrcMeta() {
    return `
/**
* ${pkg.description}
 * ${pkg.homepage}
 *
 * 贡献者：
 *     ${pkg.author}
 *
 * 依赖版本：
 *     ${[
     'eslint',
     'babel-eslint',
     'vue-eslint-parser',
     'eslint-plugin-vue',
     '@typescript-eslint/parser',
     '@typescript-eslint/eslint-plugin'
 ]
     .map((key) => `${key} ${(pkg as any).devDependencies[key]}`)
     .join('\n *     ')}
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 *
 * @reason 为什么要开启（关闭）此规则
 */
`;
}
