const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')

const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false }, // (todo, in-progress, done)
    due_date: { type: DataTypes.DATE, allowNull: false },
    assigned_to: { type: DataTypes.BIGINT, allowNull: true },
    created_by: { type: DataTypes.BIGINT, allowNull: false },
},{
    underscored: true, 
    timestamps: true,
    paranoid: true, // Enables soft deletes
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});

Task.belongsTo(User, { foreignKey: 'created_by', as: 'createdBy'});
Task.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignedTo'});

module.exports = Task;