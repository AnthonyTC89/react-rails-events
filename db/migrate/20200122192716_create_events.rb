class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.date :date
      t.time :time
      t.string :location
      t.integer :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
