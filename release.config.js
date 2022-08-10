module.exports = {
    branches: [
        { name: 'main' },
        ...(process.env.BETA_RELEASE === 'true' && process.env.GITHUB_REF_NAME !== undefined
            ? [
                  {
                      name: process.env.GITHUB_REF_NAME,
                      prerelease: `beta-${process.env.GITHUB_REF_NAME}`.replace(/[^0-9A-Za-z-]/g, '-'),
                  },
              ]
            : []),
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'angular',
                releaseRules: [
                    { breaking: true, release: 'major' },
                    { revert: true, release: 'patch' },
                    { type: 'feat', release: 'minor' },
                    { type: 'fix', release: 'patch' },
                    { type: 'perf', release: 'patch' },
                    { type: 'docs', release: 'patch' },
                    { type: 'refactor', release: 'patch' },
                ],
                parserOpts: {
                    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
                },
            },
        ],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/github',
        '@semantic-release/npm',
    ],
}
