class VideoModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#videoModal');
    this.modalTitle = this.modal.locator('.modal-title');
    this.closeButton = this.modal.locator('.modal-footer').getByRole('button', { name: 'Close' });
  }

  async closeModal() {
    await this.closeButton.click();
  }
}

module.exports = { VideoModal };