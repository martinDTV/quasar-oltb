import _ from 'lodash';

const SvgPaths = Object.freeze({
  SubMenuIcon: Object.freeze({
    stroked: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="4 3 24 25" width="24px" fill="#00000"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
  }),
  arrowClockwise: Object.freeze({
        stroked: `
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        `
    }),
})

const DefaultOptions = Object.freeze({
    path: SvgPaths.arrowClockwise.stroked,
    width: 24,
    height: 24,
    fill: 'currentColor',
    stroke: '#FFFFFFFF',
    strokeWidth: 0,
    shouldReplaceHashtag: false,
    class: ''
});
const getIcon = function(options = {}) {
    options = _.merge(_.cloneDeep(DefaultOptions), options);

    // Note:
    // HEX Colors are not valid in SVG
    // Unless they are replaced with URL alternative char
    const ENCODED_HASHTAG = '%23';

    if(options.shouldReplaceHashtag) {
        options.fill = options.fill.replace('#', ENCODED_HASHTAG);
        options.stroke = options.stroke.replace('#', ENCODED_HASHTAG);
    }

    return (`
        <svg xmlns="http://www.w3.org/2000/svg"
            width="${options.width}"
            height="${options.height}"
            fill="${options.fill}"
            stroke="${options.stroke}"
            stroke-width="${options.strokeWidth}"
            class="${options.class}"
            viewBox="0 0 16 16">
            ${options.path}
        </svg>
    `);
}

export { SvgPaths, getIcon };
