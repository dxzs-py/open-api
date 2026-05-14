/**
 * 官方文档https://commitlint.js.org/#/
 * feature：新特性
 * bugfix：线上功能bug
 * minor：不重要的修改（换行，拼写错误等）
 * optimization: 功能优化
 * sprintfix：未上线代码修改 （功能模块未上线部分bug）
 * refactor：功能重构
 * test：增加测试代码
 * docs：编写文档
 * merge：分支合并及冲突解决
 */
module.exports = {
    extends: [
        '@commitlint/config-conventional'
    ],
    rules: {
        'type-enum': [2, 'always', [
            'feature', 'bugfix', 'minor', 'optimization', 'sprintfix', 'refactor', 'test', 'docs', 'merge'
        ]],
        'type-case': [0],
        'type-empty': [2, 'never'],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72]
    },
}
