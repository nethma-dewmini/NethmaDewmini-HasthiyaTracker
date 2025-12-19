import type { Request, Response } from 'express';
import pool from '../config/db.js';

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM projects');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
};

//Get project by ID
export const getProjetcbyId = async (req: Request, res: Response) =>{
  try{
    const [rows]: any = await pool.execute (`SELECT * FROM projects WHERE id = ?`, [req.params.id]);
if(rows.length === 0){
  res.status(404).json({ success: false, message: 'Project not found'});
  return;
}
res.json({success: true, data: rows[0]});
  }catch(error){
    res.status(500).json({success: false, message: 'Failed to fetch project'});
  }
};

//Create new project
export const createProject = async (req: Request, res: Response) => {
  try{
    const {name, description,status, due_date} = req.body;
    const [result]: any = await pool.execute(
'INSERT INTO projects (name, description, status, due_date) VALUES (?,?,?,?)',
[name,description,status || 'Pending', due_date]

    );
    res.status(201).json({success: true, message: 'Project created!', id: result.insertId });
  }catch(error){
res.status(500).json({success: false, message: 'Failed to create project'});
  }
  
};

//Update a project
export const updateProject = async (req: Request, res: Response) => {
  try{
    const {name, description, status, due_date} = req.body;
    await pool.execute(
      'UPDATE projects SET name = ?, description =? , status = ?, due_date =? WHERE id=?',
      [name, description, status, due_date, req.params.id]
    );
    res.json({success: true, message: 'Project updated!'});
  }catch(error){
    res.status(500).json({success: false, message: 'Failed to update the project'});
  }
};

//Delete a project

export const deleteProject = async (req: Request, res: Response) => {
  try{
    await pool.execute('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({success: true, message: 'Project deleted!'});
  }catch(error){
    res.status(500).json({success: false, message: 'Failed to delete the project'});
  }
};