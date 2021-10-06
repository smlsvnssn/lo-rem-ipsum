import './imports/oQuery.min.js';
import { löremIpsum } from './imports/loremIpsum.js';

ö(() => {
    const

        wrapFirstWords = (s, numWords = 3, startWrap = '<span>', endWrap = '</span>', startAtChar = 0) =>
            s.slice(0, startAtChar) +
            s.slice(startAtChar)
                .replace(
                    new RegExp('([\\s]*[a-zA-ZåäöÅÄÖøØ0-9\'’]+){0,' + (numWords) + '}\\S?'),
                    startWrap + '$&' + endWrap
                ),

        randUser = () => {
            let call = async function () {
                let
                    url = `https://randomuser.me/api/?nat=dk,no?nocache=${ö.random(1, true)}`,
                    r;

                try {
                    r = await ö.load(url);
                    for (const u of r.results)
                        ö(".byline").html(
                            `<div>
							<div class="img"><img src="${u.picture.thumbnail}" /></div>
							<div class="author">
								<address class="text">
									${löremIpsum(1, 1, 1, { isHeadline: true, nyordFrequency: 0 })
                            + " " + löremIpsum(1, 1, 1, { isHeadline: true, nyordFrequency: 0 })}
									<br>
									<time class="text">${ö.random(1, 32)}/${ö.random(1, 13)} ${ö.random(1960, 2020)}</time>
									<a href="#" class="text">${löremIpsum(1, 1, 5, { useLörem: false })}</a>
								</address>
							</div>
							</div>
						`
                        );
                } catch (e) {
                    //ö.log(e)
                    setCssColours;
                }
            };

            call();

            return '';
        },

        setCssColours = () => {
            const
                hue = Math.random() * 360,
                [light, dark] = [[85, hue, 'multiply'], [10, hue + 180, 'screen']],
                [a, b] = ö.random(2) > 0 ? [light, dark] : [dark, light];

            ö(':root').css({
                '--bg': ö.hsla(a[1], 50, a[0]),
                '--clr': ö.hsla(b[1], 50, b[0]),
                '--bgAlpha': ö.hsla(a[1], 50, a[0], .7),
                '--clrAlpha': ö.hsla(b[1], 50, b[0], .7),
                '--bgAlphaLight': ö.hsla(a[1], 50, a[0], .1),
                '--clrAlphaLight': ö.hsla(b[1], 50, b[0], .1),
                '--multiply': a[2],
                '--screen': b[2]
            });
        },

        toggleSettings = e => {
            ö('.settings')
                .toggleClass('hidden')
                .wait().on('clickoutside', e =>
                    ö('.settings')
                        .toggleClass('hidden')
                        .off()
                );
        },

        toggleInfo = e => {
            ö('body').toggleClass('hidden');
            ö('#infobox').toggleClass('hidden')
                .on('click', e => {
                    ö('#infobox').toggleClass('hidden').off();
                    ö('body').toggleClass('hidden');
                })
        },


        copyFrom = element => {
            const range = document.createRange(),
                selection = window.getSelection();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
            navigator.clipboard.writeText(element.innerHTML);
        },

        renderLayout = () => {
            //console.time('t')

            ö('#wrapper').html(`

				<p class="dårrad">
					§ ${ö.random(1, 100) + '.' + ö.random(1, 10)}
					<span>${löremIpsum(1, 1, 3)}</span>
				</p>

				<h1>${löremIpsum(1, 1, 8, { useLörem: false, isHeadline: true })}</h1>

				<p class="ingress">${löremIpsum(1, 4, 8)}</p>

				<article class="byline">${randUser()}</article>

				${wrapFirstWords(
                löremIpsum(ö.random(1, 4), 6, 10, { alwaysWrapParagraph: true, useLörem: false })
                , 4, '<span>', '</span>', 3
            )}

				<blockquote>${löremIpsum(1, 4, 8)}</blockquote>

				${wrapFirstWords(
                löremIpsum(ö.random(1, 4), 6, 10, { alwaysWrapParagraph: true })
                , 4, '<span>', '</span>', 3
            )}

				<h2>${löremIpsum(1, 1, 5, { useLörem: false, isHeadline: true })}</h2>

				<figure class="img"><img src="https://picsum.photos/200/200?nocache=${ö.random(1, true)}" /></figure>

				${wrapFirstWords(
                löremIpsum(ö.random(1, 4), 6, 10, { alwaysWrapParagraph: true })
                , 4, '<span>', '</span>', 3
            )}

				<h3>${löremIpsum(1, 1, 5, { useLörem: false, isHeadline: true })}</h3>

				${wrapFirstWords(
                löremIpsum(ö.random(1, 4), 6, 10, { alwaysWrapParagraph: true })
                , 4, '<span>', '</span>', 3
            )}

				<h3>${löremIpsum(1, 1, 5, { useLörem: false, isHeadline: true })}</h3>

				${wrapFirstWords(
                löremIpsum(ö.random(1, 4), 6, 10, { alwaysWrapParagraph: true })
                , 4, '<span>', '</span>', 3
            )}

			`);
            //console.timeEnd('t')
        },

        render = e => {
            //
            // check form
            //
            const headline = ö('#isHeadline'),
                minSentenceLength = ö('#minSentenceLength'),
                maxSentenceLength = ö('#maxSentenceLength'),
                sentencesPerParagraph = ö('#sentencesPerParagraph');

            // cap min sentence length
            if (+minSentenceLength.val() > maxSentenceLength.val())
                minSentenceLength.val(maxSentenceLength.val());

            minSentenceLength.attr('max', (maxSentenceLength.val()));

            // set target value to both slider fields
            if (ö(e.target).hasClass('slider'))
                ö('#' + e.target.id).val(e.target.value);

            // if useHeadline, set paragraph length to 1 and vice verca
            if (headline.e().checked && e.target.id !== 'sentencesPerParagraph')
                sentencesPerParagraph.val(1);

            if (sentencesPerParagraph.val() > 1)
                headline.e().checked = false;

            //
            // render
            //
            if ((e.target.id === 'formIsActive' && !e.target.checked) || doLayout) {
                ö('#functionCall').empty();
                renderLayout();
            } else {
                ö('#formIsActive').e().checked = true;
                ö('#wrapper').html(`
				${löremIpsum(
                    +ö('#numberOfParagraphs').val(),
                    +sentencesPerParagraph.val(),
                    +maxSentenceLength.val(),
                    {
                        minSentenceLength: +minSentenceLength.val(),
                        isHeadline: headline.e().checked,
                        isName: ö('#isName').e().checked,
                        nyordFrequency: ö('#nyordFrequency').val() / 100,
                        neologismerFrequency: ö('#neologismerFrequency').val() / 100,
                        namnFrequency: ö('#namnFrequency').val() / 100,
                        buzzFrequency: ö('#buzzFrequency').val() / 100,
                        useLörem: ö('#useLörem').e().checked,
                        punchline: ö('#punchline').val(),
                        wrapInDiv: ö('#wrapInDiv').e().checked,
                        paragraphStartWrap: headline.e().checked ? '<h2>' : '<p>',
                        paragraphEndWrap: headline.e().checked ? '</h2>' : '</p>',
                        
                        alwaysWrapParagraph: ö('#alwaysWrapParagraph').e().checked
                    }
                )}
			`);

                // render function call
                ö('#functionCall').html(
                    `<pre>löremIpsum(${ö('#numberOfParagraphs').val()}, ${sentencesPerParagraph.val()}, ${maxSentenceLength.val()}, {
		minSentenceLength: ${+minSentenceLength.val()},
		isHeadline: ${headline.e().checked},
		isName: ${ö('#isName').e().checked},
		nyordFrequency: ${ö('#nyordFrequency').val() / 100},
		neologismerFrequency: ${ö('#neologismerFrequency').val() / 100},
        namnFrequency: ${ö('#namnFrequency').val() / 100},
        buzzFrequency: ${ö('#buzzFrequency').val() / 100},
		useLörem: ${ö('#useLörem').e().checked},
		punchline: '${ö('#punchline').val()}',
		wrapInDiv: ${ö('#wrapInDiv').e().checked},
		paragraphStartWrap: '${headline.e().checked ? '&lt;h2&gt;' : '&lt;p&gt;'}',
		paragraphEndWrap: '${headline.e().checked ? '&lt;h2&gt;' : '&lt;/p&gt;'}',
		alwaysWrapParagraph: ${ö('#alwaysWrapParagraph').e().checked}
	}
)
</pre>`
                );
            }

            // set after initial render
            doLayout = false;

        };

    let doLayout = true;

    //ö.verbose(false);

    ö('.cogs').on('click', toggleSettings);
    ö('.info').on('click', toggleInfo);
    ö('.copy').on('click', () => copyFrom(ö('#wrapper').e()));
    ö('.rerun').on('click', () => {
        doLayout = !ö('#formIsActive').e().checked;
        setCssColours();
        render({
            target: {}
        });
    });

    ö('form').throttle('input', render, 200);
    //ö('#randomColour').on('click', setCssColours);
    setCssColours();
    render({
        target: {}
    });
});



