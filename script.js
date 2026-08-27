/**
 * タブ切り替え処理
 * @param {string} dayId - 表示対象のタブID ('day1', 'day2', 'day3')
 * @param {HTMLElement} btnElement - クリックされたボタン要素
 */
function switchTab(dayId, btnElement) {
  // すべてのタブコンテンツを非表示にする
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  // すべてのタブボタンのアクティブ状態（装飾）を解除する
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // 選択されたタブコンテンツを表示する
  const targetContent = document.getElementById(dayId);
  if (targetContent) {
    targetContent.classList.add('active');
  }

  // クリックされたボタンをアクティブ化する
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // スムーズにタブ上部付近へスクロールする
  window.scrollTo({
    top: 100,
    behavior: 'smooth'
  });
}